/**
 * @generated SignedSource<<d9463464815d2102ce31ad39e7105d8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type getPluginsUsePluginsQuery$variables = Record<PropertyKey, never>;
export type getPluginsUsePluginsQuery$data = {
  readonly installedPlugins: ReadonlyArray<{
    readonly hasMobileRuntime: boolean;
    readonly slug: string;
    readonly url: string;
  }>;
};
export type getPluginsUsePluginsQuery = {
  response: getPluginsUsePluginsQuery$data;
  variables: getPluginsUsePluginsQuery$variables;
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
    "name": "getPluginsUsePluginsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "getPluginsUsePluginsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ba01e3b2547d7c10d5f1e1689b08804c",
    "id": null,
    "metadata": {},
    "name": "getPluginsUsePluginsQuery",
    "operationKind": "query",
    "text": "query getPluginsUsePluginsQuery {\n  installedPlugins {\n    slug\n    url\n    hasMobileRuntime\n  }\n}\n"
  }
};
})();

(node as any).hash = "2e1c25a85cb9ea7d4198f9468b272edc";

export default node;
