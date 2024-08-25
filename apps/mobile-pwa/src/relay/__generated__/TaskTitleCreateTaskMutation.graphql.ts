/**
 * @generated SignedSource<<0e2377fc61b69980bb40b0cac3ed0e33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
export type MutationCreateTaskInput = {
  actionDatas?: ReadonlyArray<TaskActionDataInput> | null | undefined;
  atIndex?: number | null | undefined;
  date?: string | null | undefined;
  durationInMinutes?: number | null | undefined;
  itemId?: string | null | undefined;
  pluginDatas?: ReadonlyArray<TaskPluginDataInput> | null | undefined;
  status?: TaskStatus | null | undefined;
  title: string;
};
export type TaskActionDataInput = {
  data?: JsonValue | null | undefined;
  pluginSlug: string;
};
export type TaskPluginDataInput = {
  full?: JsonValue | null | undefined;
  min?: JsonValue | null | undefined;
  originalId?: string | null | undefined;
  pluginSlug: string;
};
export type TaskTitleCreateTaskMutation$variables = {
  input: MutationCreateTaskInput;
};
export type TaskTitleCreateTaskMutation$data = {
  readonly createTask: {
    readonly date: string;
    readonly durationInMinutes: number | null | undefined;
    readonly id: string;
    readonly status: TaskStatus;
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"TaskCard_task">;
  };
};
export type TaskTitleCreateTaskMutation = {
  response: TaskTitleCreateTaskMutation$data;
  variables: TaskTitleCreateTaskMutation$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v6 = {
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
    "name": "TaskTitleCreateTaskMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Task",
        "kind": "LinkedField",
        "name": "createTask",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "TaskCard_task"
          }
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
    "name": "TaskTitleCreateTaskMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Task",
        "kind": "LinkedField",
        "name": "createTask",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "completedAt",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Task",
            "kind": "LinkedField",
            "name": "subtasks",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6bcaed2a4765115cd57f0f36d152e29d",
    "id": null,
    "metadata": {},
    "name": "TaskTitleCreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation TaskTitleCreateTaskMutation(\n  $input: MutationCreateTaskInput!\n) {\n  createTask(input: $input) {\n    id\n    title\n    date\n    status\n    durationInMinutes\n    ...TaskCard_task\n  }\n}\n\nfragment TaskCardStatusButton_task on Task {\n  status\n  id\n}\n\nfragment TaskCardSubtask_task on Task {\n  id\n  status\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n\nfragment TaskCardTitle_task on Task {\n  id\n  title\n}\n\nfragment TaskCard_task on Task {\n  id\n  date\n  title\n  status\n  completedAt\n  subtasks {\n    id\n    ...TaskCardSubtask_task\n  }\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n"
  }
};
})();

(node as any).hash = "bc3783981a8e9cccb99ed07b03b576fa";

export default node;
