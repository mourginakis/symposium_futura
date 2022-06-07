import { symposium_futura, canisterId, createActor } from "../../declarations/symposium_futura";
import { _SERVICE } from "../../declarations/symposium_futura/symposium_futura.did";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, ActorSubclass, ProxyStubAgent, /*HttpAgent*/ } from "@dfinity/agent";


import React, {useEffect, useState, useContext} from "react";
import ReactDOM from "react-dom/client";
import { flushSync } from "react-dom";
import exampleposts from "../assets/exampleposts.json";
import '../assets/css/symposium.scss';


import {animateIn, animateOut, Ribbons, AnimateNav, AnimateBorder, AnimateContent} from "./animations"


interface AuthContextInterface {
  authClient: AuthClient | undefined,
  isAuthenticated: boolean | undefined,
  identity: Identity | undefined,
  futura_actor: ActorSubclass<_SERVICE> | undefined
}


// const AuthContext = React.createContext({
//   authClient: null,
//   isAuthenticated: false,
//   identity: null,
//   futura_actor: null
// });


const AuthContext = React.createContext<AuthContextInterface>({
  authClient: undefined,
  isAuthenticated: false,
  identity: undefined,
  futura_actor: undefined
});


function App() {
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [identity, setIdentity] = useState<Identity>();
  const [futura_actor, setFutura_Actor] = useState<ActorSubclass<_SERVICE>>();

  const [myData, setMyData] = useState<number>(0);
  const [myString, setMyString] = useState<string | undefined>("Oogabooga");

  const [navChoice, setNavChoice] = useState<string>("home");

  console.log("rerendering entire app")


  useEffect(() => {
    console.log("useEffect just got called")
    const init = async () => {
      // works even on page refresh
      const temp_authClient = await AuthClient.create();
      const temp_isAuthenticated = await temp_authClient.isAuthenticated();
      setAuthClient(temp_authClient);
      setIsAuthenticated(temp_isAuthenticated);

      handleAuthenticated(temp_authClient)
    };
    init();
  }, []);


  const authenticate = async () => {
    console.log("attempting authenticate");
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);

    await authClient?.login({
      onSuccess: async () => {
        console.log("successful login");
        setIsAuthenticated(true);
        handleAuthenticated(authClient);
      },
      identityProvider:
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : process.env.LOCAL_II_CANISTER,
      // Maximum authorization expiration is 8 days
      maxTimeToLive: days * hours * nanoseconds,
    });
  };



  const handleAuthenticated = async (authClient: AuthClient) => {
    console.log("handling authenticated")
    const temp_identity = (await authClient?.getIdentity()) as unknown as Identity;
    const identity = temp_identity;
    setIdentity(temp_identity);

    const temp_futura_actor = createActor(canisterId as string, {
      agentOptions: {
        identity,
      },
    });

    setFutura_Actor(temp_futura_actor);

    const response = await futura_actor?.whoami();


    // Invalidate identity then render login when user goes idle
    authClient?.idleManager?.registerCallback(() => {
      Actor.agentOf(temp_futura_actor)?.invalidateIdentity?.();
      //renderIndex();
      console.log("user timeout");
    });
  };

  const deauthenticate = async() => {
    authClient?.logout();
    setIsAuthenticated(await authClient?.isAuthenticated());
    handleAuthenticated(authClient as AuthClient)
  }


  const loginAuthContext: AuthContextInterface = {
    authClient: authClient,
    isAuthenticated: isAuthenticated,
    identity: identity,
    futura_actor: futura_actor
  }

  // Rendering 
    return (
      <AuthContext.Provider value={loginAuthContext}>
          <NavBar navSelection={setNavChoice}/>
          <ProfileCard authenticate={authenticate} deauthenticate={deauthenticate}/>
          <PageContent navSelection={navChoice}/>
      </AuthContext.Provider>
    );
}


function PageContent(props) {
  const {isAuthenticated, futura_actor} = useContext(AuthContext);

  if (props.navSelection == "about") {
    return (
      <div className="main" id="maincontent">
        <div className="container">
          <p>about page!!!</p>
        </div>
      </div>
    );
  } else {
    // home
    return (
      <div className="main" id="maincontent">
        <div className="container">
          {isAuthenticated ? <NewPost /> : <div />}
          {exampleposts.map((post) => (
            <SinglePost
              key={post.id}
              title={post.title}
              author={post.author}
              content={post.content}
            />
          ))}
        </div>
      </div>
    );
  }
}

function NavBar(props) {
  return (
    <nav id="nav">
      <a href="#" onClick={() => props.navSelection("home")}>
        <div className="logotitle">
          {/* <img src="img/cypher/cool_cypher.svg" alt="cypher" /> */}
          {/* <img src="img/generic_quill.png" alt="quill"/> */}
          <video autoPlay loop>
            <source src="img/cypher/cool_cypher_encoded.webm" type="video/webm"></source>
          </video>
          <div>
            <h2>SYMPOSIUM FUTURA</h2>
            <p>community knowledge engine</p>
          </div>
        </div>
      </a>
      <div className="about">
        <a href="#" onClick={() => props.navSelection("about")}>
          <h5>about</h5>
        </a>
      </div>
    </nav>
  );
}




function ProfileCard(props) {
  const {isAuthenticated, futura_actor} = useContext(AuthContext);
  const [name, setName] = useState<string>("ANONYMOUS");
  const [id, setId] = useState<string | undefined>('2vxsx-fae');
  const [bio, setBio] = useState<string>();
  console.log("rerendering profilecard")

  useEffect(() => {
    const init = async () => {
      if (isAuthenticated) {
        setName("-----")
        const response = await futura_actor?.whoami();
        setId(response?.toString());
        setName("YOU");
        setBio("your bio");
      }
    };
    init();
  }, [isAuthenticated]);

  useEffect(() =>
  {
    if (!isAuthenticated) {
      Ribbons.init();
    }
  });

  // this needs to be stopped from re-rendering during the animation

  const placeholders = [
    "when you're ready to change the world",
    "and be my guiding light",
    "from this dream",
    "and find the truth",
  ];

  const pseudonym = props.pseudonym || "ANONYMOUS";
  // const bio = props.bio || (<p>wake me<br />{rand_nth(placeholders)}</p>);
  const money = props.money || "$₣: 200 ∞";

  function makeLoggedOutBio() {
    return (<p>wake me<br />{rand_nth(placeholders)}</p>);
  }

  function AuthenticatedView() {
    AnimateNav.animateOut();
    AnimateContent.animateOut();
    return (
      <div className="sidebar">
        <div id="content">
        <img src="img/hellorobotsomitsleep-cropped.jpeg" alt="profile" />
        <p id="idbox">{id}</p>
        <h5 id="pseudonym">{name}</h5>
        <div id="bio">{bio}</div>
        <p id="money">{money}</p>
        <button id="authButton" onClick={props.deauthenticate}>DEAUTHENTICATE</button>
      </div>
      </div>
    )
  }

  function UnauthenticatedView() {
    return (
      <div className="sidebar">
        <div id="content">
          <img src="img/hellorobotsomitsleep-cropped.jpeg" alt="profile" />
          <p id="idbox">{id}</p>
          <h5 id="pseudonym">{name}</h5>
          <div id="bio">{makeLoggedOutBio()}</div>
          <p id="money">{money}</p>
          <button
            id="authButton"
            onClick={props.authenticate}
            onMouseOver={() => animateIn()}
            onMouseOut={() => animateOut()}
          >
            AUTHENTICATE
          </button>
        </div>
       <BorderAnimation />
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <AuthenticatedView />;
  } else {
    return <UnauthenticatedView />;
  }
}


function BorderAnimation(props) {
  return (
      <svg id="colordrawing">
        <rect id="rectangle1" className="shape" />
        <rect id="rectangle2" className="shape" />
        <rect id="rectangle3" className="shape" />
        <rect id="rectangle4" className="shape" />
        {/* <line className="shape" x1="0" x2="500"/> */}
      </svg>
  );
}




function SinglePost(props) {
  return (
    <div className="row">
      <h4>{props.title}</h4>
      <h6>{props.author}</h6>
      <p>{props.content}</p>
      <hr />
    </div>
  );
}

function NewPost(props) {
  return (
    <>
    <form>
      <div className="row">
      <label htmlFor="title">Title</label>
      <input className="u-full-width" type="text" id="newPostContent" />
      <label htmlFor="exampleMessage">Content</label>
      <textarea className="u-full-width" placeholder="" id="newPostContent"></textarea>
      <input type="submit" value="Submit" />
      </div>
    </form>
    <hr />
    </>
  )
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);







/** UTILS */

function rand_nth(a: Array<String>): String {
  return a[Math.floor(Math.random() * a.length)];
}







