import { symposium_futura, canisterId, createActor } from "../../declarations/symposium_futura";
import { _SERVICE } from "../../declarations/symposium_futura/symposium_futura.did";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, ActorSubclass, /*HttpAgent*/ } from "@dfinity/agent";


import React, {useEffect, useState, useContext} from "react";
import ReactDOM from "react-dom/client";
import { flushSync } from "react-dom";
import exampleposts from "../assets/exampleposts.json";
import '../assets/css/symposium.scss';



const audio = new Audio("../ill-find-you-crystal-river-inmysleep.mp3");



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

  console.log("rerendered");


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
          <div>
          <NavBar />
          <ProfileCard authenticate={authenticate} deauthenticate={deauthenticate}/>
            <div className="main" id="maincontent">
              <div className="container">
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
      </div>
      </AuthContext.Provider>
    );
}



function NavBar() {
  return (
    <nav>
      <a href="/">
        <div className="logotitle">
          <img src="img/generic_quill.png" alt="quill" />
          <div>
            <h2>SYMPOSIUM FUTURA</h2>
            <p>community knowledge engine</p>
          </div>
        </div>
      </a>
      <div className="about">
        <a href="#about">
          <h5>about</h5>
        </a>
      </div>
    </nav>
  );
}




function ProfileCard(props) {
  const {isAuthenticated, futura_actor} = useContext(AuthContext);
  const [name, setName] = useState<string>();
  const [id, setId] = useState<string>();

  useEffect(() => {
    const init = async () => {
      setName("-----")
      const response = await futura_actor?.whoami();
      setId(response?.toString());
      setName("EINSTEIN");
    };
    init();
  }, [isAuthenticated]);

  const placeholders = [
    "when you're ready to change the world",
    "and be my guiding light",
    "from this dream",
    "and find the truth",
  ];

  function animateIn() {
    const elem = document.getElementById("maincontent");
    elem!.animate([{
      transform: 'translate(42px, 0px)',
      filter: 'blur(10px)',
    }], {
      duration: 1000,
      fill: 'forwards',
      easing: 'ease-out',
    })
    // elem!.style.marginLeft = "300px";
    // elem!.style.filter = "blur(1px)";
    // elem!.style.transform = "translate(42px, 0px)";
    audio.play();
  }

  function animateOut() {
    //clearInterval(this.timerID);
    const elem = document.getElementById("maincontent");
    elem!.animate([{
      transform: 'translate(0px, 0px)',
      filter: 'blur(0px)',
    }], {
      duration: 0,
      fill: 'forwards',
      easing: 'ease-out',
    })
    // elem!.style.transform = "translate(0px, 0px)";
    // elem!.style.filter = "blur(0px)";
    audio.pause();
    audio.load();
  }

  const pseudonym = props.pseudonym || "ANONYMOUS";
  const bio = props.bio || (<p>wake me<br />{rand_nth(placeholders)}</p>);
  const money = props.money || "$₣: 200 ∞";


  function AuthenticatedView() {
    return (
      <div className="sidebar">
        <img src="img/hellorobotsomitsleep-cropped.jpeg" alt="profile" />
        <p id="idbox">{id}</p>
        <h5 id="pseudonym">{name}</h5>
        <div id="bio">{bio}</div>
        <p id="money">{money}</p>
        <button id="authButton" onClick={props.deauthenticate}>DEAUTHENTICATE</button>
      </div>
    )
  }

  function UnauthenticatedView() {
    return (
      <div className="sidebar">
        <img src="img/hellorobotsomitsleep-cropped.jpeg" alt="profile" />
        <p id="idbox">{id}</p>
        <h5 id="pseudonym">{pseudonym}</h5> 
        <div id="bio">{bio}</div>
        <p id="money">{money}</p>
        <button id="authButton" onClick={props.authenticate}
          onMouseOver={() => animateIn()}
          onMouseOut={() => animateOut()}>AUTHENTICATE</button>
      </div>
    );
  }
  
  if (isAuthenticated) {
    return <AuthenticatedView />;
  } else {
    return <UnauthenticatedView />;
  }
}




function SinglePost(props) {
  return (
    <div className="row">
      <h4>{props.title}</h4>
      <h6>{props.author}</h6>
      <p>{props.content}</p>
    </div>
  );
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);







/** UTILS */

function rand_nth(a: Array<String>): String {
  return a[Math.floor(Math.random() * a.length)];
}







