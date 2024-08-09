/**
 * @generated SignedSource<<5ea4ce4791a98553f50b44e9af8ca44e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getPluginsQuery$variables = Record<PropertyKey, never>;
export type getPluginsQuery$data = {
  readonly installedPlugins: ReadonlyArray<{
    readonly hasMobileRuntime: boolean;
    readonly slug: string;
    readonly url: string;
  }>;
};
export type getPluginsQuery = {
  response: getPluginsQuery$data;
  variables: getPluginsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PluginInstallation",
    "kind": "LinkedField",
    "name": "installedPlugins",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "url",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "hasMobileRuntime",
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
    "name": "getPluginsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "getPluginsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "8eae7199d03b71f9fa68bf9ee2e287b5",
    "id": null,
    "metadata": {},
    "name": "getPluginsQuery",
    "operationKind": "query",
    "text": "query getPluginsQuery {\n  installedPlugins {\n    slug\n    url\n    hasMobileRuntime\n  }\n}\n"
  }
};
})();

(node as any).hash = "93d06b733036481a7b6fddb9a465ae27";

export default node;
