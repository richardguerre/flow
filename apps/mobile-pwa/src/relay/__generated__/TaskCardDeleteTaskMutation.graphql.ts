/**
 * @generated SignedSource<<07fec7848ca3a83d83873664fec15042>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TaskCardDeleteTaskMutation$variables = {
  id: string;
};
export type TaskCardDeleteTaskMutation$data = {
  readonly deleteTask: {
    readonly date: string;
    readonly id: string;
  };
};
export type TaskCardDeleteTaskMutation = {
  response: TaskCardDeleteTaskMutation$data;
  variables: TaskCardDeleteTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "deleteTask",
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
        "name": "date",
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
    "name": "TaskCardDeleteTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskCardDeleteTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a8a989d8a8ea8875fc19b3749f174c2e",
    "id": null,
    "metadata": {},
    "name": "TaskCardDeleteTaskMutation",
    "operationKind": "mutation",
    "text": "mutation TaskCardDeleteTaskMutation(\n  $id: ID!\n) {\n  deleteTask(id: $id) {\n    id\n    date\n  }\n}\n"
  }
};
})();

(node as any).hash = "ecf1a01e66f90fd98ddc3ddb977e73bd";

export default node;
