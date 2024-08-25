/**
 * @generated SignedSource<<17a86c6d1f9f86726d5050656c78ab4f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type TaskStatus = "CANCELED" | "DONE" | "TODO";
export type MutationCreateTaskInput = {
  actionDatas?: ReadonlyArray<TaskActionDataInput> | null | undefined;
  atIndex?: number | null | undefined;
  date?: string | null | undefined;
  durationInMinutes?: number | null | undefined;
  itemId?: string | null | undefined;
  pluginDatas?: ReadonlyArray<TaskPluginDataInput> | null | undefined;
  status?: TaskStatus | null | undefined;
  title: string;
};
export type TaskActionDataInput = {
  data?: JsonValue | null | undefined;
  pluginSlug: string;
};
export type TaskPluginDataInput = {
  full?: JsonValue | null | undefined;
  min?: JsonValue | null | undefined;
  originalId?: string | null | undefined;
  pluginSlug: string;
};
export type IndexViewCreateTaskMutation$variables = {
  input: MutationCreateTaskInput;
};
export type IndexViewCreateTaskMutation$data = {
  readonly createTask: {
    readonly date: string;
    readonly durationInMinutes: number | null | undefined;
    readonly id: string;
    readonly status: TaskStatus;
    readonly title: string;
  };
};
export type IndexViewCreateTaskMutation = {
  response: IndexViewCreateTaskMutation$data;
  variables: IndexViewCreateTaskMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Task",
    "kind": "LinkedField",
    "name": "createTask",
    "plural": false,
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
        "name": "durationInMinutes",
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
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IndexViewCreateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IndexViewCreateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b8c190ff310903af35ba1f92fea10451",
    "id": null,
    "metadata": {},
    "name": "IndexViewCreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation IndexViewCreateTaskMutation(\n  $input: MutationCreateTaskInput!\n) {\n  createTask(input: $input) {\n    id\n    title\n    durationInMinutes\n    date\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "59c1891794de3a5cde8477c152931ee1";

export default node;
