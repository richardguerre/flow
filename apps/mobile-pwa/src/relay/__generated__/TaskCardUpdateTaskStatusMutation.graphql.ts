/**
 * @generated SignedSource<<d281cd811f9aba7c1629425c75e198cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
export type MutationUpdateTaskStatusInput = {
  actionData?: ReadonlyArray<TaskActionDataInput> | null | undefined;
  id: string;
  status: TaskStatus;
};
export type TaskActionDataInput = {
  data?: JsonValue | null | undefined;
  pluginSlug: string;
};
export type TaskCardUpdateTaskStatusMutation$variables = {
  input: MutationUpdateTaskStatusInput;
};
export type TaskCardUpdateTaskStatusMutation$data = {
  readonly updateTaskStatus: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Day_day">;
  }>;
};
export type TaskCardUpdateTaskStatusMutation = {
  response: TaskCardUpdateTaskStatusMutation$data;
  variables: TaskCardUpdateTaskStatusMutation$variables;
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
  "name": "date",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskCardUpdateTaskStatusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Day",
        "kind": "LinkedField",
        "name": "updateTaskStatus",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Day_day"
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
    "name": "TaskCardUpdateTaskStatusMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Day",
        "kind": "LinkedField",
        "name": "updateTaskStatus",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Task",
            "kind": "LinkedField",
            "name": "tasks",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v3/*: any*/),
              (v2/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
                  (v3/*: any*/),
                  (v5/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4e5f5a4d248248aa93d07b018e03733d",
    "id": null,
    "metadata": {},
    "name": "TaskCardUpdateTaskStatusMutation",
    "operationKind": "mutation",
    "text": "mutation TaskCardUpdateTaskStatusMutation(\n  $input: MutationUpdateTaskStatusInput!\n) {\n  updateTaskStatus(input: $input) {\n    ...Day_day\n    id\n  }\n}\n\nfragment DayContent_day on Day {\n  date\n  tasks {\n    __typename\n    id\n    ...TaskCard_task\n  }\n}\n\nfragment Day_day on Day {\n  date\n  ...DayContent_day\n}\n\nfragment TaskCardStatusButton_task on Task {\n  status\n  id\n}\n\nfragment TaskCardSubtask_task on Task {\n  id\n  status\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n\nfragment TaskCardTitle_task on Task {\n  id\n  title\n}\n\nfragment TaskCard_task on Task {\n  id\n  date\n  title\n  status\n  completedAt\n  subtasks {\n    id\n    ...TaskCardSubtask_task\n  }\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n"
  }
};
})();

(node as any).hash = "4bdedcde3a9735b856bfc9f1432a46b7";

export default node;
