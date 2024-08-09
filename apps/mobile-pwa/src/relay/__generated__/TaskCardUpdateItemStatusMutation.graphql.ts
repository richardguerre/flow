/**
 * @generated SignedSource<<d3f87176aa94c5d1f292913caff8ef45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MutationUpdateItemStatusInput = {
  done: boolean;
  id: string;
};
export type TaskCardUpdateItemStatusMutation$variables = {
  input: MutationUpdateItemStatusInput;
};
export type TaskCardUpdateItemStatusMutation$data = {
  readonly updateItemStatus: {
    readonly id: string;
    readonly isRelevant: boolean;
  };
};
export type TaskCardUpdateItemStatusMutation = {
  response: TaskCardUpdateItemStatusMutation$data;
  variables: TaskCardUpdateItemStatusMutation$variables;
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
    "concreteType": "Item",
    "kind": "LinkedField",
    "name": "updateItemStatus",
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
        "name": "isRelevant",
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
    "name": "TaskCardUpdateItemStatusMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskCardUpdateItemStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7834afc56082caea11de8b958daa737a",
    "id": null,
    "metadata": {},
    "name": "TaskCardUpdateItemStatusMutation",
    "operationKind": "mutation",
    "text": "mutation TaskCardUpdateItemStatusMutation(\n  $input: MutationUpdateItemStatusInput!\n) {\n  updateItemStatus(input: $input) {\n    id\n    isRelevant\n  }\n}\n"
  }
};
})();

(node as any).hash = "b828e47e946a214ae5ea3a025cdbc930";

export default node;
