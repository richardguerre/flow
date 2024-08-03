/**
 * @generated SignedSource<<cd5243427f2ea57b91dde491c6f8bc20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MutationLoginInput = {
  password: string;
};
export type LoginViewLoginMutation$variables = {
  input: MutationLoginInput;
};
export type LoginViewLoginMutation$data = {
  readonly token: string;
};
export type LoginViewLoginMutation = {
  response: LoginViewLoginMutation$data;
  variables: LoginViewLoginMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": "token",
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "kind": "ScalarField",
    "name": "login",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginViewLoginMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginViewLoginMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "738d0d10c797d9ce46a7ab3069eaf5f2",
    "id": null,
    "metadata": {},
    "name": "LoginViewLoginMutation",
    "operationKind": "mutation",
    "text": "mutation LoginViewLoginMutation(\n  $input: MutationLoginInput!\n) {\n  token: login(input: $input)\n}\n"
  }
};
})();

(node as any).hash = "15e201db0c055adbb6ccd570fc56a855";

export default node;
