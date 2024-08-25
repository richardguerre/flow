/**
 * @generated SignedSource<<1c53be0a0c9f9f2ddc3aa49a2ce44b6f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type QueryStoreItemsInput = {
  keys?: ReadonlyArray<string> | null | undefined;
  pluginSlug?: string | null | undefined;
};
export type getStoreUtilsGetQuery$variables = {
  where: QueryStoreItemsInput;
};
export type getStoreUtilsGetQuery$data = {
  readonly storeItems: ReadonlyArray<{
    readonly key: string;
    readonly value: JsonValue | null | undefined;
  }>;
};
export type getStoreUtilsGetQuery = {
  response: getStoreUtilsGetQuery$data;
  variables: getStoreUtilsGetQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "key",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "value",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "getStoreUtilsGetQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Store",
        "kind": "LinkedField",
        "name": "storeItems",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
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
    "name": "getStoreUtilsGetQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Store",
        "kind": "LinkedField",
        "name": "storeItems",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
    "cacheID": "b0704c2abb6395d7ae3f529634359a23",
    "id": null,
    "metadata": {},
    "name": "getStoreUtilsGetQuery",
    "operationKind": "query",
    "text": "query getStoreUtilsGetQuery(\n  $where: QueryStoreItemsInput!\n) {\n  storeItems(where: $where) {\n    key\n    value\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "8814b08a7a4befc7b7751c8ccef3777a";

export default node;
