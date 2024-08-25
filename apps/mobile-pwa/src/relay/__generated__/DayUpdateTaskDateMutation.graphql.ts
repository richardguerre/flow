/**
 * @generated SignedSource<<c8b4cac1ac20ae1d355936283e0a98bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MutationUpdateTaskDateInput = {
  date: string;
  id: string;
  newTasksOrder: ReadonlyArray<string>;
};
export type DayUpdateTaskDateMutation$variables = {
  input: MutationUpdateTaskDateInput;
};
export type DayUpdateTaskDateMutation$data = {
  readonly updateTaskDate: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"Day_day">;
  }>;
};
export type DayUpdateTaskDateMutation = {
  response: DayUpdateTaskDateMutation$data;
  variables: DayUpdateTaskDateMutation$variables;
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
    "name": "DayUpdateTaskDateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Day",
        "kind": "LinkedField",
        "name": "updateTaskDate",
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
    "name": "DayUpdateTaskDateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Day",
        "kind": "LinkedField",
        "name": "updateTaskDate",
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
    "cacheID": "2534cea629e6bc9fd16a2968bf01f6b2",
    "id": null,
    "metadata": {},
    "name": "DayUpdateTaskDateMutation",
    "operationKind": "mutation",
    "text": "mutation DayUpdateTaskDateMutation(\n  $input: MutationUpdateTaskDateInput!\n) {\n  updateTaskDate(input: $input) {\n    ...Day_day\n    id\n  }\n}\n\nfragment DayContent_day on Day {\n  date\n  tasks {\n    __typename\n    id\n    ...TaskCard_task\n  }\n}\n\nfragment Day_day on Day {\n  date\n  ...DayContent_day\n}\n\nfragment TaskCardStatusButton_task on Task {\n  status\n  id\n}\n\nfragment TaskCardSubtask_task on Task {\n  id\n  status\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n\nfragment TaskCardTitle_task on Task {\n  id\n  title\n}\n\nfragment TaskCard_task on Task {\n  id\n  date\n  title\n  status\n  completedAt\n  subtasks {\n    id\n    ...TaskCardSubtask_task\n  }\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n"
  }
};
})();

(node as any).hash = "a22478d08dc05ae8e2a9e90f8c7607e4";

export default node;
