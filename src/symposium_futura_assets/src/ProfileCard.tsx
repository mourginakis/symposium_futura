import React, {useEffect, useState, useContext} from "react";


import {animateIn, animateOut, AnimateRibbons, AnimateNav, AnimateContent} from "./animations"
import {rand_nth} from "./utils";
import AuthContext from "./auth";


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
        AnimateRibbons.init();
      }
    });
  
  
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
          <img src="img/symposium_cat_noah-cropped.svg" alt="profile" />
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
            <img src="img/symposium_cat_noah-cropped.svg" alt="profile" />
            <p id="idbox">{id}</p>
            <h5 id="pseudonym">{name}</h5>
            <div id="bio">{makeLoggedOutBio()}</div>
            <p id="money">{money}</p>
            <button
              id="authButton"
              className="authButtonAnimation"
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

  export default ProfileCard;