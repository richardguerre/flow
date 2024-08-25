/**
 * @generated SignedSource<<a07c8387493e1ce0d3fb53e079c8ae0a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Day_day$data = {
  readonly date: string;
  readonly " $fragmentSpreads": FragmentRefs<"DayContent_day">;
  readonly " $fragmentType": "Day_day";
};
export type Day_day$key = {
  readonly " $data"?: Day_day$data;
  readonly " $fragmentSpreads": FragmentRefs<"Day_day">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Day_day",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DayContent_day"
    }
  ],
  "type": "Day",
  "abstractKey": null
};

(node as any).hash = "1fb3d6bdbe57ff3180a32025d1304d5a";

export default node;
