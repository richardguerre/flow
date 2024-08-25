/**
 * @generated SignedSource<<12f4545f746031a3bb5843472d43501a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
import { FragmentRefs } from "relay-runtime";
export type TaskCardStatusButton_task$data = {
  readonly id: string;
  readonly status: TaskStatus;
  readonly " $fragmentType": "TaskCardStatusButton_task";
};
export type TaskCardStatusButton_task$key = {
  readonly " $data"?: TaskCardStatusButton_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardStatusButton_task">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskCardStatusButton_task",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Task",
  "abstractKey": null
};

(node as any).hash = "3a2b69b4e2793ef01ae11f51615d3e60";

export default node;
