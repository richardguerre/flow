/**
 * @generated SignedSource<<0889f0952c8c0a65fc9faa45217414e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskTagsAttrs_tag$data = {
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "TaskTagsAttrs_tag";
};
export type TaskTagsAttrs_tag$key = {
  readonly " $data"?: TaskTagsAttrs_tag$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskTagsAttrs_tag">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskTagsAttrs_tag",
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
    }
  ],
  "type": "TaskTag",
  "abstractKey": null
};

(node as any).hash = "329152b5c55a7c21ad34ae52473e6a52";

export default node;
