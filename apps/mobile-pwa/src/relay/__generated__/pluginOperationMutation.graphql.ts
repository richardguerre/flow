/**
 * @generated SignedSource<<a2f4c06897bcad23b9add9b1cd90da5d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MutationPluginOperationInput = {
  data?: JsonValue | null | undefined;
  operationName: string;
  pluginSlug: string;
};
export type pluginOperationMutation$variables = {
  input: MutationPluginOperationInput;
};
export type pluginOperationMutation$data = {
  readonly pluginOperation: {
    readonly data: JsonValue | null | undefined;
    readonly id: string;
  } | null | undefined;
};
export type pluginOperationMutation = {
  response: pluginOperationMutation$data;
  variables: pluginOperationMutation$variables;
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
    "name": "pluginOperationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pluginOperationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "adbba4e5a75b116417ce023c11d328d5",
    "id": null,
    "metadata": {},
    "name": "pluginOperationMutation",
    "operationKind": "mutation",
    "text": "mutation pluginOperationMutation(\n  $input: MutationPluginOperationInput!\n) {\n  pluginOperation(input: $input) {\n    id\n    data\n  }\n}\n"
  }
};
})();

(node as any).hash = "c213ac26a175e960bcdcb4b05e559abd";

export default node;
