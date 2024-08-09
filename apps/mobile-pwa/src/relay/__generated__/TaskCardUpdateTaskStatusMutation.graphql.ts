/**
 * @generated SignedSource<<2588835af84b58e1b8aa84db70de6f92>>
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
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Item",
                "kind": "LinkedField",
                "name": "item",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isRelevant",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "durationInMinutes",
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
    "cacheID": "6cea5dd0e47395a5ece96049eb222ecf",
    "id": null,
    "metadata": {},
    "name": "TaskCardUpdateTaskStatusMutation",
    "operationKind": "mutation",
    "text": "mutation TaskCardUpdateTaskStatusMutation(\n  $input: MutationUpdateTaskStatusInput!\n) {\n  updateTaskStatus(input: $input) {\n    ...Day_day\n    id\n  }\n}\n\nfragment DayAddTaskActionsBar_day on Day {\n  date\n}\n\nfragment DayContent_day on Day {\n  date\n  tasks {\n    __typename\n    id\n    ...TaskCard_task\n  }\n}\n\nfragment Day_day on Day {\n  date\n  ...DayContent_day\n  ...DayAddTaskActionsBar_day\n}\n\nfragment TaskCardActions_task on Task {\n  status\n  id\n  item {\n    id\n    isRelevant\n  }\n  ...TaskCardDurationButton_task\n}\n\nfragment TaskCardContextMenu_task on Task {\n  id\n  date\n}\n\nfragment TaskCardDurationButton_task on Task {\n  id\n  durationInMinutes\n}\n\nfragment TaskCardSubtask_task on Task {\n  id\n  title\n  status\n  date\n}\n\nfragment TaskCard_task on Task {\n  id\n  date\n  title\n  status\n  completedAt\n  subtasks {\n    id\n    ...TaskCardSubtask_task\n  }\n  ...TaskCardActions_task\n  ...TaskTitle_task\n  ...TaskCardContextMenu_task\n}\n\nfragment TaskTitle_task on Task {\n  id\n  title\n  date\n  status\n  durationInMinutes\n}\n"
  }
};
})();

(node as any).hash = "4bdedcde3a9735b856bfc9f1432a46b7";

export default node;
