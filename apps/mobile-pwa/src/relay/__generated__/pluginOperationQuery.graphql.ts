/**
 * @generated SignedSource<<2a2be4442524bc248a7f55aa6d1b3b03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type QueryPluginOperationInput = {
  data?: JsonValue | null | undefined;
  operationName: string;
  pluginSlug: string;
};
export type pluginOperationQuery$variables = {
  input: QueryPluginOperationInput;
};
export type pluginOperationQuery$data = {
  readonly pluginOperation: {
    readonly data: JsonValue | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type pluginOperationQuery = {
  response: pluginOperationQuery$data;
  variables: pluginOperationQuery$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "PluginOperation",
    "kind": "LinkedField",
    "name": "pluginOperation",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "data",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "pluginOperationQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pluginOperationQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5c4944cc85225f03cd6dcb023ad13004",
    "id": null,
    "metadata": {},
    "name": "pluginOperationQuery",
    "operationKind": "query",
    "text": "query pluginOperationQuery(\n  $input: QueryPluginOperationInput!\n) {\n  pluginOperation(input: $input) {\n    id\n    data\n  }\n}\n"
  }
};
})();

(node as any).hash = "0b211917bb5cf26f0613bf601ceeb1ed";

export default node;
