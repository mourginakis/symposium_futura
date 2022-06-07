import { symposium_futura, canisterId, createActor } from "../../declarations/symposium_futura";
import { _SERVICE } from "../../declarations/symposium_futura/symposium_futura.did";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, ActorSubclass, ProxyStubAgent, /*HttpAgent*/ } from "@dfinity/agent";


import React, {useEffect, useState, useContext} from "react";
import '../assets/css/symposium.scss';


import NavBar from "./NavBar";
import ProfileCard from "./ProfileCard";
import PageContent from "./PageContent";
import AuthContext, {AuthContextInterface} from "./auth";



export default function App() {
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
          <div className="main" id="maincontent">
            <div className="container">
                <PageContent navSelection={navChoice}/>
            </div>
        </div>
      </AuthContext.Provider>
    );
}

