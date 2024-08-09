/**
 * @generated SignedSource<<284b76c6065149586c3f4dd63be48196>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DayContent_day$data = {
  readonly date: string;
  readonly tasks: ReadonlyArray<{
    readonly __typename: "Task";
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"TaskCard_task">;
  }>;
  readonly " $fragmentType": "DayContent_day";
};
export type DayContent_day$key = {
  readonly " $data"?: DayContent_day$data;
  readonly " $fragmentSpreads": FragmentRefs<"DayContent_day">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DayContent_day",
  "selections": [
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
      "concreteType": "Task",
      "kind": "LinkedField",
      "name": "tasks",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "TaskCard_task"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Day",
  "abstractKey": null
};

(node as any).hash = "be54455b4008e695a8b09857ceaf7e4a";

export default node;
