/**
 * @generated SignedSource<<337ca729f3966796064f9fa04aa961b8>>
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
export type TaskTitleUpdateTaskTitleMutation$variables = {
  input: MutationUpdateTaskInput;
};
export type TaskTitleUpdateTaskTitleMutation$data = {
  readonly updateTask: {
    readonly id: string;
    readonly title: string;
  };
};
export type TaskTitleUpdateTaskTitleMutation = {
  response: TaskTitleUpdateTaskTitleMutation$data;
  variables: TaskTitleUpdateTaskTitleMutation$variables;
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
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "updateTask",
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
        "name": "title",
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
    "name": "TaskTitleUpdateTaskTitleMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TaskTitleUpdateTaskTitleMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "134f30312057816a7c0d8984566d4390",
    "id": null,
    "metadata": {},
    "name": "TaskTitleUpdateTaskTitleMutation",
    "operationKind": "mutation",
    "text": "mutation TaskTitleUpdateTaskTitleMutation(\n  $input: MutationUpdateTaskInput!\n) {\n  updateTask(input: $input) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "50fb71fbbb78a9950fc54b56af7a5bc9";

export default node;
