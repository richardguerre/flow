/**
 * @generated SignedSource<<6551f07422221b08c4ad60990c8641e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type IndexViewQuery$variables = {
  afterDay: string;
};
export type IndexViewQuery$data = {
  readonly days: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"Day_day">;
      };
    }>;
  };
};
export type IndexViewQuery = {
  response: IndexViewQuery$data;
  variables: IndexViewQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "afterDay"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "afterDay"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
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
    "name": "IndexViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "QueryDaysConnection",
        "kind": "LinkedField",
        "name": "days",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueryDaysConnectionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Day",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IndexViewQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "QueryDaysConnection",
        "kind": "LinkedField",
        "name": "days",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "QueryDaysConnectionEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Day",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
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
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "949807583087a0f166ccc07b63458703",
    "id": null,
    "metadata": {},
    "name": "IndexViewQuery",
    "operationKind": "query",
    "text": "query IndexViewQuery(\n  $afterDay: ID!\n) {\n  days(after: $afterDay, first: 1) {\n    edges {\n      node {\n        ...Day_day\n        id\n      }\n    }\n  }\n}\n\nfragment DayAddTaskActionsBar_day on Day {\n  date\n}\n\nfragment DayContent_day on Day {\n  date\n  tasks {\n    __typename\n    id\n    ...TaskCard_task\n  }\n}\n\nfragment Day_day on Day {\n  date\n  ...DayContent_day\n  ...DayAddTaskActionsBar_day\n}\n\nfragment TaskCardActions_task on Task {\n  status\n  id\n  item {\n    id\n    isRelevant\n  }\n  ...TaskCardDurationButton_task\n}\n\nfragment TaskCardContextMenu_task on Task {\n  id\n  date\n}\n\nfragment TaskCardDurationButton_task on Task {\n  id\n  durationInMinutes\n}\n\nfragment TaskCardSubtask_task on Task {\n  id\n  title\n  status\n  date\n}\n\nfragment TaskCard_task on Task {\n  id\n  date\n  title\n  status\n  completedAt\n  subtasks {\n    id\n    ...TaskCardSubtask_task\n  }\n  ...TaskCardActions_task\n  ...TaskTitle_task\n  ...TaskCardContextMenu_task\n}\n\nfragment TaskTitle_task on Task {\n  id\n  title\n  date\n  status\n  durationInMinutes\n}\n"
  }
};
})();

(node as any).hash = "775030734cb471a1337758ecb7dd494e";

export default node;
