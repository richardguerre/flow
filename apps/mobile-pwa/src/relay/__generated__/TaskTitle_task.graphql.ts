/**
 * @generated SignedSource<<94d9c9bc8c35847bd2fe1f8fb3c74c32>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
import { FragmentRefs } from "relay-runtime";
export type TaskTitle_task$data = {
  readonly date: string;
  readonly durationInMinutes: number | null | undefined;
  readonly id: string;
  readonly status: TaskStatus;
  readonly title: string;
  readonly " $fragmentType": "TaskTitle_task";
};
export type TaskTitle_task$key = {
  readonly " $data"?: TaskTitle_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskTitle_task">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskTitle_task",
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
      "name": "date",
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
      "name": "durationInMinutes",
      "storageKey": null
    }
  ],
  "type": "Task",
  "abstractKey": null
};

(node as any).hash = "c9981bfc6ed1f609d00e1e4a9bb4e079";

export default node;
