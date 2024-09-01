/**
 * @generated SignedSource<<108172afdb8f8d16e1f08c84bb6e0016>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Color = "amber" | "blue" | "cyan" | "emerald" | "fuchsia" | "gray" | "green" | "indigo" | "lime" | "neutral" | "orange" | "pink" | "purple" | "red" | "rose" | "sky" | "slate" | "stone" | "teal" | "violet" | "yellow" | "zinc";
import { FragmentRefs } from "relay-runtime";
export type TaskTagsNode_tag$data = {
  readonly color: Color;
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "TaskTagsNode_tag";
};
export type TaskTagsNode_tag$key = {
  readonly " $data"?: TaskTagsNode_tag$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskTagsNode_tag">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskTagsNode_tag",
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
  "type": "TaskTag",
  "abstractKey": null
};

(node as any).hash = "1b24b19e0bfdfdfc38da49fe1375a266";

export default node;
