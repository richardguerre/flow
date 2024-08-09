/**
 * @generated SignedSource<<47a0a733a0c73f9215b02a019d4bf542>>
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
  readonly date: string;
  readonly id: string;
  readonly status: TaskStatus;
  readonly title: string;
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
      "name": "title",
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

(node as any).hash = "ac07f44d2f5251973f0cc27016a709e8";

export default node;
