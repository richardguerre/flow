/**
 * @generated SignedSource<<566e2caadef765877b6bfd91ee845c26>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskCardDurationButton_task$data = {
  readonly durationInMinutes: number | null | undefined;
  readonly id: string;
  readonly " $fragmentType": "TaskCardDurationButton_task";
};
export type TaskCardDurationButton_task$key = {
  readonly " $data"?: TaskCardDurationButton_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardDurationButton_task">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskCardDurationButton_task",
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
      "name": "durationInMinutes",
      "storageKey": null
    }
  ],
  "type": "Task",
  "abstractKey": null
};

(node as any).hash = "e79bab612e24897ba958afb86976cd24";

export default node;
