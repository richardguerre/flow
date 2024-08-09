/**
 * @generated SignedSource<<8f53c11303187deef692fb492dfc74cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type MutationUpdateTaskInput = {
  durationInMinutes?: number | null | undefined;
  id: string;
  title?: string | null | undefined;
};
export type TaskCardUpdateTaskDurationMutation$variables = {
  input: MutationUpdateTaskInput;
};
export type TaskCardUpdateTaskDurationMutation$data = {
  readonly updateTask: {
    readonly durationInMinutes: number | null | undefined;
  };
};
export type TaskCardUpdateTaskDurationMutation = {
  response: TaskCardUpdateTaskDurationMutation$data;
  variables: TaskCardUpdateTaskDurationMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "durationInMinutes",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskCardUpdateTaskDurationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Task",
        "kind": "LinkedField",
        "name": "updateTask",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskCardUpdateTaskDurationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Task",
        "kind": "LinkedField",
        "name": "updateTask",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "043ef0f14d0be0217b5580c70451442e",
    "id": null,
    "metadata": {},
    "name": "TaskCardUpdateTaskDurationMutation",
    "operationKind": "mutation",
    "text": "mutation TaskCardUpdateTaskDurationMutation(\n  $input: MutationUpdateTaskInput!\n) {\n  updateTask(input: $input) {\n    durationInMinutes\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "96216c7078ed4b587c241a62e3cfb66a";

export default node;
