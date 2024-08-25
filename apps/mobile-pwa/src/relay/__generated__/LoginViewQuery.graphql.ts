/**
 * @generated SignedSource<<6b12ed3ca8809f6d84a8884832fe4e0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type LoginViewQuery$variables = Record<PropertyKey, never>;
export type LoginViewQuery$data = {
  readonly isFullySetup: boolean;
};
export type LoginViewQuery = {
  response: LoginViewQuery$data;
  variables: LoginViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isFullySetup",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginViewQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LoginViewQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "fa89581ab8d8a86e7596ffc054e1c8dd",
    "id": null,
    "metadata": {},
    "name": "LoginViewQuery",
    "operationKind": "query",
    "text": "query LoginViewQuery {\n  isFullySetup\n}\n"
  }
};
})();

(node as any).hash = "def3319b8c35e8ce35ce561d88a973b2";

export default node;
