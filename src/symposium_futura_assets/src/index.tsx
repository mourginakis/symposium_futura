import { /*symposium_futura,*/ canisterId, createActor } from "../../declarations/symposium_futura";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, /*HttpAgent*/ } from "@dfinity/agent";




import * as React from "react";
//import { render } from "react-dom";
import ReactDOM from "react-dom/client";
import exampleposts from "../assets/exampleposts.json";


function authorize() {
  console.log("user requested authorization but fn unimplemented");
}

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <ProfileCard />
        <MainContent />
      </div>
    );
  }
}



class ProfileCard extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <img src="img/hellorobotsomitsleep-cropped.jpeg" alt="profile" />
        <h5 id="pseudonym">ANONYMOUS</h5>
        <p id="bio">
          wake me {/*from */} when you're ready to change the world
        </p>
        {/* <!-- be my guiding light --> */}
        {/* <!-- wake me from this dream --> */}
        {/* <!-- come with me and find the truth --> */}
        <p>$₣: 200 ∞</p>
        <button id="authButton" onClick={authorize}>Authorize</button>
      </div>
    );
  }
}


// type Post = {
//     id: number;
//     title: string;
//     author: string;
//     postdate: string;
//     lastupdate: string;
//     content: string;
// }

class SinglePost extends React.Component<{
  title: string;
  content: string;
  author: string;
}> {
  render() {
    return (
      <div className="row">
        <h4>{this.props.title}</h4>
        <p>{this.props.content}</p>
      </div>
    );
  }
}




class MainContent extends React.Component {
  render() {
    return (
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
    );
  }
}



class NavBar extends React.Component {
  render() {
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
}


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);







const init = async () => {
  const authClient = await AuthClient.create();

  const authButton = document.getElementById(
    "authButton"
  ) as HTMLButtonElement;

  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);

  authButton.onclick = async () => {
    await authClient.login({
      onSuccess: async () => {
        console.log("logged in");
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
}


async function handleAuthenticated(authClient: AuthClient) {

  const identity = authClient.getIdentity() as unknown as Identity;

  const futura_actor = createActor(canisterId as string, {
    agentOptions: {
      identity,
    },
  });

  // Invalidate identity then render login when user goes idle
  authClient.idleManager?.registerCallback(() => {
    Actor.agentOf(futura_actor)?.invalidateIdentity?.();
    //renderIndex();
  });

  const response = await futura_actor.whoami();

  (document.getElementById("pseudonym") as HTMLElement)
  .innerText = response.toString();
}

//  Enable this for login functionality -- but needs to be fixed first 
// init();









// SCRAP


// const MyHello = () => {
//   const [name, setName] = React.useState('');
//   const [message, setMessage] = React.useState('');

//   async function doGreet() {
//     // const greeting = await custom_greeting.greet(name);
//     // setMessage(greeting);
//     console.log("I have no idea what i'm doing!!!");
//   }

//   return (
//     <div style={{ "fontSize": "30px" }}>
//     </div>
//   );
// };

// render(<MyHello />, document.getElementById("app"));
