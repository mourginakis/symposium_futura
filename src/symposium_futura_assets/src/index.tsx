import { /*symposium_futura,*/ canisterId, createActor } from "../../declarations/symposium_futura";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, /*HttpAgent*/ } from "@dfinity/agent";




import * as React from "react";
//import { render } from "react-dom";
import ReactDOM from "react-dom/client";
import exampleposts from "../assets/exampleposts.json";
import '../assets/css/symposium.scss';


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


function rand_nth(a: Array<String>): String {
  return a[Math.floor(Math.random() * a.length)];
}


class ProfileCard extends React.Component<
  {},
  { audio: HTMLAudioElement}
> {
  timerID: NodeJS.Timer | undefined;

  constructor(props) {
    super(props);
    this.state = {
      audio: new Audio("../ill-find-you-crystal-river-inmysleep.mp3"),
    };
    /** ideally this constructor will block until HTMLMediaElement.HAVE_ENOUGH_DATA is true */

  }

  animate(): void {
    console.log("Animating!!");
    this.state.audio.play();
    this.timerID = setInterval(() => {
      console.log("1 second has gone by");
    }, 1000);
  }

  render() {
    const placeholders = [
      "when you're ready to change the world",
      "and be my guiding light",
      "from this dream",
      "and find the truth",
    ];

    // const audio = new Audio('../ill-find-you-crystal-river-inmysleep.mp3');
    // audio.load();

    return (
      <div className="sidebar">
        <img src="img/hellorobotsomitsleep-cropped.jpeg" alt="profile" />
        <h5 id="pseudonym">ANONYMOUS</h5>
        <div className="bio">
          <p id="bio">
            {"wake me"}
            <br />
            {rand_nth(placeholders)}
          </p>
        </div>
        <p>$₣: 200 ∞</p>
        <button
          id="authButton"
          onClick={authorize}
          onMouseOver={() => this.animate() }
          onMouseOut={() => {
            clearInterval(this.timerID);
            this.state.audio.pause();
            this.state.audio.load();
          }}
        >
          Authorize
        </button>
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
        <h6>{this.props.author}</h6>
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
