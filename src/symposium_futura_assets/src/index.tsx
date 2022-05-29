import { /*symposium_futura,*/ canisterId, createActor } from "../../declarations/symposium_futura";
import { _SERVICE } from "../../declarations/symposium_futura/symposium_futura.did";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, ActorSubclass, /*HttpAgent*/ } from "@dfinity/agent";


import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import exampleposts from "../assets/exampleposts.json";
import '../assets/css/symposium.scss';


const audio = new Audio("../ill-find-you-crystal-river-inmysleep.mp3");




function App() {
  const [authClient, setAuthClient] = useState<AuthClient>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [identity, setIdentity] = useState<Identity>();
  const [futura_actor, setFutura_Actor] = useState<ActorSubclass<_SERVICE>>();

  console.log("rerunning function!!!!");


  useEffect(() => {
    const init = async () => {
      const authClient1 = await AuthClient.create();
      const authentic = await authClient1.isAuthenticated();
      setAuthClient(authClient1);
      setIsAuthenticated(authentic);
      console.log("probably not authenticated");
    };
    init();
  }, []);


  const authorize = async () => {
    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);

    await authClient?.login({
      onSuccess: async () => {
        console.log("logged in");
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
    const identity1 = (await authClient?.getIdentity()) as unknown as Identity;
    setIdentity(identity1);

    const futura_actor1 = createActor(canisterId as string, {
      agentOptions: {
        identity,
      },
    });
    setFutura_Actor(futura_actor1);

    // Invalidate identity then render login when user goes idle
    authClient?.idleManager?.registerCallback(() => {
      Actor.agentOf(futura_actor1)?.invalidateIdentity?.();
      //renderIndex();
    });
  };

  const deauthorize = async() => {
    authClient?.logout();
    setIsAuthenticated(false)
  }


  // Rendering 
  if (!isAuthenticated) {
    return (
      <div>
      <h1>YU are not authenticated!!</h1>
      <button onClick={authorize}>Authorize</button>
      <button onClick={deauthorize}>deAuthorize</button>
      </div>
    );
  }

  // isAuthenticated = true
  return (
    <div>
      <NavBar />
      <ProfileCard />
        <div className="main">
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
        <button onClick={deauthorize}>deAuthorize</button>
    </div>
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







