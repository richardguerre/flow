/**
 * @generated SignedSource<<3503359bddc82c3e7106d74c8f21f25b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type getPluginsUsePlugins_pluginInstallation$data = {
  readonly hasMobileRuntime: boolean;
  readonly slug: string;
  readonly url: string;
  readonly " $fragmentType": "getPluginsUsePlugins_pluginInstallation";
};
export type getPluginsUsePlugins_pluginInstallation$key = {
  readonly " $data"?: getPluginsUsePlugins_pluginInstallation$data;
  readonly " $fragmentSpreads": FragmentRefs<"getPluginsUsePlugins_pluginInstallation">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "getPluginsUsePlugins_pluginInstallation",
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
  "type": "PluginInstallation",
  "abstractKey": null
};

(node as any).hash = "60b0354438a14b061e33287c23b46540";

export default node;
