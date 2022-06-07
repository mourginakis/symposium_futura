import React from "react";

import { AuthClient } from "@dfinity/auth-client";
import { Actor, Identity, ActorSubclass, ProxyStubAgent, /*HttpAgent*/ } from "@dfinity/agent";
import { _SERVICE } from "../../declarations/symposium_futura/symposium_futura.did";


export interface AuthContextInterface {
  authClient: AuthClient | undefined;
  isAuthenticated: boolean | undefined;
  identity: Identity | undefined;
  futura_actor: ActorSubclass<_SERVICE> | undefined;
}

const AuthContext = React.createContext<AuthContextInterface>({
  authClient: undefined,
  isAuthenticated: false,
  identity: undefined,
  futura_actor: undefined,
});

  export default AuthContext;