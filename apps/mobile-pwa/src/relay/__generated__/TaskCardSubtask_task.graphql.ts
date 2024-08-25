/**
 * @generated SignedSource<<5d2915cb3eb221b15d89b774a1d47033>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
import { FragmentRefs } from "relay-runtime";
export type TaskCardSubtask_task$data = {
  readonly id: string;
  readonly status: TaskStatus;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardStatusButton_task" | "TaskCardTitle_task">;
  readonly " $fragmentType": "TaskCardSubtask_task";
};
export type TaskCardSubtask_task$key = {
  readonly " $data"?: TaskCardSubtask_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardSubtask_task">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskCardSubtask_task",
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
      "name": "status",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TaskCardStatusButton_task"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TaskCardTitle_task"
    }
  ],
  "type": "Task",
  "abstractKey": null
};

(node as any).hash = "0093fdba5f9929f32f541a3fec885244";

export default node;
