/**
 * @generated SignedSource<<8244b1c9459008ea9f6f7711af2e146c>>
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
  readonly " $fragmentSpreads": FragmentRefs<"DayAddTaskActionsBar_day" | "DayContent_day">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DayAddTaskActionsBar_day"
    }
  ],
  "type": "Day",
  "abstractKey": null
};

(node as any).hash = "72d16b5a1bc3290d01debf8f07fc5abb";

export default node;
