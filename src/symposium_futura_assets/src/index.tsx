import { /*symposium_futura,*/ canisterId, createActor } from "../../declarations/symposium_futura";
import { _SERVICE } from "../../declarations/symposium_futura/symposium_futura.did";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, ActorSubclass, /*HttpAgent*/ } from "@dfinity/agent";


import React, {useEffect, useState, useContext} from "react";
import ReactDOM from "react-dom/client";
import { flushSync } from "react-dom";
import exampleposts from "../assets/exampleposts.json";
import '../assets/css/symposium.scss';


const audio = new Audio("../ill-find-you-crystal-river-inmysleep.mp3");





const AuthContext = React.createContext({
  authClient: null,
  isAuthenticated: false,
  identity: null,
  futura_actor: null
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

      // console.log(temp_isAuthenticated, isAuthenticated)


      // if (temp_isAuthenticated) {
      handleAuthenticated(temp_authClient)
      // }

      // // kinda works?? but not on page refresh
      // setAuthClient(await AuthClient.create())
      // console.log(authClient);
      // console.log("setisauthenticated: " + await authClient.isAuthenticated())
      // setIsAuthenticated(await authClient?.isAuthenticated())
      // console.log(isAuthenticated)

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
    
    // const response = await futura_actor1?.whoami();
    // console.log(response?.toString())

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
    // flushSync(() => {
    //   setIsAuthenticated(false);
    // });
    // setIsAuthenticated(false)
    // setIdentity(undefined);
    // setFutura_Actor(undefined);
  }


  // Rendering 
    return (
      <AuthContext.Provider value={{
        authClient: authClient as any,
        isAuthenticated: isAuthenticated as boolean,
        identity: identity as any,
        futura_actor: futura_actor as any,
        }}>
        <div>
          <h1>authenticate options</h1>
          Counter
          <button onClick={() => setMyData(myData + 1)}>
            Click me
            </button>
          {myData}
          <br / >
            <h4>State</h4>
            {"authClient:   " + authClient} <br / >
            {"isAuthenticated:  " + isAuthenticated} <br />
            {"identity:  " + identity} <br / >
            {"actor:  " + futura_actor + ", tostring: " + futura_actor?.toString()} <br />
            <br />
          {"authClient.getIdentity().getPrincipal():    " + String(authClient?.getIdentity().getPrincipal())}<br />
          <button onClick={async () => {
            const response = await futura_actor?.whoami();
            console.log(response);
            setMyString(response?.toString());
          }}>
            whoami
            </button>
            {myString}
            <br / >
              AUTH
          <AuthButton authenticate={authenticate} deauthenticate={deauthenticate} />
        </div>
      </AuthContext.Provider>
    );

  // isAuthenticated = true
  // return (
  //   <div>
  //     <NavBar />
  //     <ProfileCard />
  //       <div className="main">
  //         <div className="container">
  //           {exampleposts.map((post) => (
  //             <SinglePost
  //               key={post.id}
  //               title={post.title}
  //               author={post.author}
  //               content={post.content}
  //             />
  //           ))}
  //         </div>
  //       </div>
  //       {/* <button onClick={deauthorize}>deAuthorize</button> */}
  //   </div>
  // );
}


function AuthButton(props) {
  const {isAuthenticated} = useContext(AuthContext);
  return (
    <button onClick={isAuthenticated ? props.deauthenticate : props.authenticate}>
        {isAuthenticated ? 'DEAUTHENTICATE' : "AUTHENTICATE"}
      </button>
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
  const placeholders = [
    "when you're ready to change the world",
    "and be my guiding light",
    "from this dream",
    "and find the truth",
  ];

  function animateIn() {
    audio.play();
    console.log("I don't do anything");
  }

  function animateOut() {
    //clearInterval(this.timerID);
    audio.pause();
    audio.load();
    console.log("I don't do anything, but in reverse");
  }

  const pseudonym = props.pseudonym || "ANONYMOUS";
  const bio = props.bio || (<p>wake me<br />{rand_nth(placeholders)}</p>);
  const money = props.money || "$₣: 200 ∞";
  

  return (
    <div className="sidebar">
      <img src="img/hellorobotsomitsleep-cropped.jpeg" alt="profile" />
      <h5 id="pseudonym">{pseudonym}</h5> 
      <div id="bio">{bio}</div>
      <p id="money">{money}</p>
      <button
        id="authButton"
        // onClick={authorize}
        onMouseOver={() => animateIn()}
        onMouseOut={() => animateOut()}
      >
        Authorize {/*"Authenticate?"*/}
      </button>
    </div>
  );
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







