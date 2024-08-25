/**
 * @generated SignedSource<<dceffb6896dcc5cdbb925bc48b0fe3d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
import { FragmentRefs } from "relay-runtime";
export type TaskCard_task$data = {
  readonly completedAt: string | null | undefined;
  readonly date: string;
  readonly id: string;
  readonly status: TaskStatus;
  readonly subtasks: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"TaskCardSubtask_task">;
  }>;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardStatusButton_task" | "TaskCardTitle_task">;
  readonly " $fragmentType": "TaskCard_task";
};
export type TaskCard_task$key = {
  readonly " $data"?: TaskCard_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCard_task">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TaskCard_task",
  "selections": [
    (v0/*: any*/),
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
      "name": "completedAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Task",
      "kind": "LinkedField",
      "name": "subtasks",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TaskCardSubtask_task"
        }
      ],
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
})();

(node as any).hash = "4ffeb343eca6b7053658a36efc770c94";

export default node;
