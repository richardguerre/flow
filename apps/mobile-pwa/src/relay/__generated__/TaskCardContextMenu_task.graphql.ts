/**
 * @generated SignedSource<<448fa4eb828f533ba7b7ece41de4a7d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TaskCardContextMenu_task$data = {
  readonly date: string;
  readonly id: string;
  readonly " $fragmentType": "TaskCardContextMenu_task";
};
export type TaskCardContextMenu_task$key = {
  readonly " $data"?: TaskCardContextMenu_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardContextMenu_task">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskCardContextMenu_task",
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
      "name": "date",
      "storageKey": null
    }
  ],
  "type": "Task",
  "abstractKey": null
};

(node as any).hash = "61e2b5555457878bff7e266b8329a51d";

export default node;
