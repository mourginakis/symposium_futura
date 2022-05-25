import { /*symposium_futura,*/ canisterId, createActor } from "../../declarations/symposium_futura";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, /*HttpAgent*/ } from "@dfinity/agent";


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

init();
