/**
 * @generated SignedSource<<d93fd4fbb695e55e74c5a309d1d290a9>>
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
export type IndexView2CreateTaskMutation$variables = {
  input: MutationCreateTaskInput;
};
export type IndexView2CreateTaskMutation$data = {
  readonly createTask: {
    readonly date: string;
    readonly durationInMinutes: number | null | undefined;
    readonly id: string;
    readonly status: TaskStatus;
    readonly title: string;
  };
};
export type IndexView2CreateTaskMutation = {
  response: IndexView2CreateTaskMutation$data;
  variables: IndexView2CreateTaskMutation$variables;
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
    "name": "IndexView2CreateTaskMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IndexView2CreateTaskMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e742fbdec44e4935eda839336ac04eaa",
    "id": null,
    "metadata": {},
    "name": "IndexView2CreateTaskMutation",
    "operationKind": "mutation",
    "text": "mutation IndexView2CreateTaskMutation(\n  $input: MutationCreateTaskInput!\n) {\n  createTask(input: $input) {\n    id\n    title\n    durationInMinutes\n    date\n    status\n  }\n}\n"
  }
};
})();

(node as any).hash = "29fa9fa44d7664f07cf13be95131ccea";

export default node;
