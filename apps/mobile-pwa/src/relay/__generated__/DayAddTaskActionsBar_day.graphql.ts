/**
 * @generated SignedSource<<91f65d41e8c06713b4eefb79519387d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DayAddTaskActionsBar_day$data = {
  readonly date: string;
  readonly " $fragmentType": "DayAddTaskActionsBar_day";
};
export type DayAddTaskActionsBar_day$key = {
  readonly " $data"?: DayAddTaskActionsBar_day$data;
  readonly " $fragmentSpreads": FragmentRefs<"DayAddTaskActionsBar_day">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DayAddTaskActionsBar_day",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "date",
      "storageKey": null
    }
  ],
  "type": "Day",
  "abstractKey": null
};

(node as any).hash = "a9f9dc3c80441b09693bb1f9eaf1f920";

export default node;
