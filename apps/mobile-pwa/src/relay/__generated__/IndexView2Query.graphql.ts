/**
 * @generated SignedSource<<174f8d6f411e91a22441ebe493fb16c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
export type IndexView2Query$variables = {
  afterDay: string;
};
export type IndexView2Query$data = {
  readonly days: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly tasks: ReadonlyArray<{
          readonly id: string;
          readonly status: TaskStatus;
        }>;
        readonly " $fragmentSpreads": FragmentRefs<"Day_day">;
      };
    }>;
  };
};
export type IndexView2Query = {
  response: IndexView2Query$data;
  variables: IndexView2Query$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
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
  "name": "title",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexView2Query",
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
                    "alias": null,
                    "args": null,
                    "concreteType": "Task",
                    "kind": "LinkedField",
                    "name": "tasks",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  },
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
    "name": "IndexView2Query",
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
                    "alias": null,
                    "args": null,
                    "concreteType": "Task",
                    "kind": "LinkedField",
                    "name": "tasks",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
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
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v2/*: any*/)
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
    "cacheID": "8abdb2d89e28d9eb670f08fcb3b5f5ce",
    "id": null,
    "metadata": {},
    "name": "IndexView2Query",
    "operationKind": "query",
    "text": "query IndexView2Query(\n  $afterDay: ID!\n) {\n  days(after: $afterDay, first: 1) {\n    edges {\n      node {\n        tasks {\n          id\n          status\n        }\n        ...Day_day\n        id\n      }\n    }\n  }\n}\n\nfragment DayContent_day on Day {\n  date\n  tasks {\n    __typename\n    id\n    ...TaskCard_task\n  }\n}\n\nfragment Day_day on Day {\n  date\n  ...DayContent_day\n}\n\nfragment TaskCardStatusButton_task on Task {\n  status\n  id\n}\n\nfragment TaskCardSubtask_task on Task {\n  id\n  status\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n\nfragment TaskCardTitle_task on Task {\n  id\n  title\n}\n\nfragment TaskCard_task on Task {\n  id\n  date\n  title\n  status\n  completedAt\n  subtasks {\n    id\n    ...TaskCardSubtask_task\n  }\n  ...TaskCardStatusButton_task\n  ...TaskCardTitle_task\n}\n"
  }
};
})();

(node as any).hash = "62a2344623c272189fa1b9c92bd505c8";

export default node;
