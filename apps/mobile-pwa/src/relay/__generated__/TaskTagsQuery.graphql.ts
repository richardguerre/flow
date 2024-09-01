/**
 * @generated SignedSource<<0c9197c439791e94cb948a95adb1cc98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type Color = "amber" | "blue" | "cyan" | "emerald" | "fuchsia" | "gray" | "green" | "indigo" | "lime" | "neutral" | "orange" | "pink" | "purple" | "red" | "rose" | "sky" | "slate" | "stone" | "teal" | "violet" | "yellow" | "zinc";
export type TaskTagsQuery$variables = Record<PropertyKey, never>;
export type TaskTagsQuery$data = {
  readonly taskTags: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly color: Color;
        readonly id: string;
        readonly name: string;
      };
    }>;
  };
};
export type TaskTagsQuery = {
  response: TaskTagsQuery$data;
  variables: TaskTagsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "QueryTaskTagsConnection",
    "kind": "LinkedField",
    "name": "taskTags",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QueryTaskTagsConnectionEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "TaskTag",
            "kind": "LinkedField",
            "name": "node",
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
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "color",
                "storageKey": null
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
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "TaskTagsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TaskTagsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "34788216619b0b803c524e92cbdc1048",
    "id": null,
    "metadata": {},
    "name": "TaskTagsQuery",
    "operationKind": "query",
    "text": "query TaskTagsQuery {\n  taskTags {\n    edges {\n      node {\n        id\n        name\n        color\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8421ef48c70129df702d56a4a2576b58";

export default node;
