/**
 * @generated SignedSource<<8cfe91748260f739fed38fa9fdd9469f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskCardTitle_task$data = {
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "TaskCardTitle_task";
};
export type TaskCardTitle_task$key = {
  readonly " $data"?: TaskCardTitle_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardTitle_task">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskCardTitle_task",
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Task",
  "abstractKey": null
};

(node as any).hash = "96e8eea96897b1c954afda2b3d03436d";

export default node;
