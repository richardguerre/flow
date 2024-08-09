/**
 * @generated SignedSource<<c8fdd6032ec6af286f94bbc6a4666793>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
import { FragmentRefs } from "relay-runtime";
export type TaskCardActions_task$data = {
  readonly id: string;
  readonly item: {
    readonly id: string;
    readonly isRelevant: boolean;
  } | null | undefined;
  readonly status: TaskStatus;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardDurationButton_task">;
  readonly " $fragmentType": "TaskCardActions_task";
};
export type TaskCardActions_task$key = {
  readonly " $data"?: TaskCardActions_task$data;
  readonly " $fragmentSpreads": FragmentRefs<"TaskCardActions_task">;
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
  "name": "TaskCardActions_task",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Item",
      "kind": "LinkedField",
      "name": "item",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isRelevant",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TaskCardDurationButton_task"
    }
  ],
  "type": "Task",
  "abstractKey": null
};
})();

(node as any).hash = "f8ce63459275cc36c59d16d9e8dea05e";

export default node;
