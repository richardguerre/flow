# Plugins

A Flow plugin is made up 2 or 3 files:
- `plugin.json` (required): A file that contains basic metatada about the plugin, such it's slug, version, and whether it has a `web` and/or `server` part.
- `web.js` (optional): A file that contains the web part of the plugin.
- `server.js` (optional): A file that contains the server part of the plugin.

At least one of `web.js` or `server.js` must be present in the plugin.

## Hosting a plugin on `jsdelivr.net` and how it will be installed

A plugin is installed through it's CDN URL. The URL should point to the directory that contains the plugin files. You can use jsdelivr to host your plugin files. For example, if your plugin files are in a GitHub repository, you can use the following URL to install the plugin:

```
https://cdn.jsdelivr.net/gh/<username>/<repository>/path/to/plugin
```

For example, Flow's essential's plugin is installed using the following URL:

```
https://cdn.jsdelivr.net/gh/richardguerre/flow/plugins/essentials/out
```

Note: the `plugins/essentials/out` directory contains the plugin files (plugin.json, web.js, and server.js).

# `plugin.json`

The plugin.json file is a JSON file that contains the following fields:
- `slug` (required): The slug of the plugin. This is used to identify the plugin in the Flow system.
- `version` (required): The version of the plugin. This is used to determine if the plugin is up to date.
- `web` (optional): A boolean that indicates whether the plugin has a web part.
- `server` (optional): A boolean that indicates whether the plugin has a server part.

## `plugin.json` example

```json
{
  "slug": "my-plugin",
  "version": "1.0.0",
  "web": true,
  "server": false
}
```

# `web.js`

The `web.js` file is a JavaScript file that exports the web part of the plugin. This file is executed in the browser and can be used to add functionality to the Flow web app.

Flow's plugin web API allows the following (non-exhaustive) list of actions:
- `routineSteps`: Add new routine steps that the user can add to their routines. Each routine exports it's own React component to be rendered during the routine.
- `settings`: Add new settings to the plugin's settings page so that the user can configure certain aspects of the plugin.
- `onCreateTask`: Add a function that interrupts the creation of a task and allows the plugin to modify the task before it is created. It can show a modal to the user to ask for additional information.
- `renderItemCardDetails`: A function to render additional details in the ItemCard.
- `renderItemCardActions`: A function to render additional actions in the ItemCard.
- `renderTaskCardDetails`: A function to render additional details in the TaskCard.
- `renderTaskCardActions`: A function to render additional actions in the TaskCard.

As seen in the examples below, the plugin is a function that takes in an `options` object and returns an object with the plugin's name and the plugin's code.

## `web.js` example

```javascript
// web.js
export default (options) => {
  const React = options.React; // this is required to use React in the plugin
  return {
    name: "My Plugin",
    // your plugin code here
  };
};
```

To make it easier you can write it in TypeScript using the `definePlugin` function from `@flowdev/plugin/web`: 

```typescript
// web.tsx
import { definePlugin } from '@flowdev/plugin/web';

export default definePlugin((options) => {
  const React = options.React; // this is required to use React in the plugin
  return {
    name: "My Plugin",
    // your plugin code here
  };
});
```

# `server.js`

The `server.js` file is a JavaScript file that exports the server part of the plugin. This file is executed in the server and can be used to add functionality to the Flow server.

## `server.js` example

```javascript
// server.js
export default (options) => ({
  name: "My Plugin",
  // your plugin code here
});
```

To make it easier you can write it in TypeScript using the `definePlugin` function from `@flowdev/plugin/server`: 

```typescript
// server.ts
import { definePlugin } from '@flowdev/plugin/server';

export default definePlugin((options) => {
  // your plugin code here
});
```

# How to create a "Hello World" plugin

## Pre-requisites

1. Have a GitHub account.
2. Have [Bun](https://bun.sh/docs) installed. You can install it [this guide](https://bun.sh/docs/installation).

## Steps

To create a "Hello World" plugin, you can follow these steps:

1. Fork the [repository](https://github.com/richardguerre/flow). It is currently the best and easiest to create a plugin for Flow.
2. Clone the repository to your local machine. If you are not familiar with Git, you can use [GitHub Desktop](https://desktop.github.com/) to clone the repository.
3. Create a new folder in the `plugins` folder. You can name it `hello-world` (or any other slug you like).
4. In this folder, create a `package.json` file with the following content:

```json
{
  "name": "hello-world",
  "version": "1.0.0",
  "scripts": {
    "build:web": "bunx --bun vite build -c vite.web.ts",
    "build:server": "bunx --bun vite build -c vite.server.ts",
    "build": "bun run build:web && bun run build:server"
  },
  "dependencies": {
    "@flowdev/plugin": "workspace:*"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "4.1.0",
    "vite": "4.5.2"
  }
}
```
Notes:
- The `@flowdev/plugin` dependency provides helper functions to create plugins. It is not published to NPM yet, so you need to use the `workspace:*` syntax to reference it and hence you need to fork and clone the Flow repository.
- The `@vitejs/plugin-react` and `vite` dependencies are recommended to build the plugin. You can use other tools like Rollup if you prefer.
- The `build:web` and `build:server` scripts build the web and server parts of the plugin respectively.
- The `build` script builds both the web and server parts of the plugin.

5. Run `bun install` in the `hello-world` folder to install the dependencies.
6. Create a `vite.web.ts` file with the following content:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "out",
    emptyOutDir: false, // this prevents Vite from deleting the out directory each time it builds, so that the server part or plugin.json is not deleted
    lib: {
      name: "flow-hello-world", // this is the slug of the plugin with the prefix "flow-"
      entry: "src/web.tsx",
      formats: ["es"], // the web part of the plugin must be an ES module, it cannot be built as a CommonJS module
      fileName: () => "web.js",
    },
  },
  define: {
    "process.env.NODE_ENV": '"production"', // this optimizes the build to only contain production React code (not the dev server with HMR).
  },
  plugins: [react({ jsxRuntime: "classic" })], // this enables React support in Vite with the classic runtime where React.createElement() is used instead of jsx().
});
```

7. Create a `vite.server.ts` file with the following content:

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "out",
    emptyOutDir: false,
    rollupOptions: { output: { exports: "named" } },
    lib: {
      name: "flow-hello-world", // this is the slug of the plugin with the prefix "flow-"
      entry: "src/server.ts",
      formats: ["cjs"], // the server part of the plugin can be built as a CommonJS module or an ES module. CommonJS is recommended.
      fileName: () => "server.js",
    },
  },
});
```

8. Create a `src` folder in the `hello-world` folder.
9. Create a `web.tsx` file in the `src` folder with the following content:

```tsx
import { definePlugin } from "@flowdev/plugin/web";

export default definePlugin((options) => {
  const React = options.React; // this is required to use React in the plugin
  return {
    name: "Hello World", // this will be the display name of the plugin in Flow, like in the settings screen
    settings: {
      "my-setting": {
        type: "textfield",
        label: "My Setting",
        description: "This is a setting in the Hello World plugin.",
        placeholder: "Enter something here",
      },
      "my-custom-setting": {
        type: "custom",
        render: () => {
          return (
            <div>This is a custom setting. It doesn't have to be an input</div>
          );
        },
      },
    }
  }
});
```

This will show a text field in the settings screen of the plugin, that the user can fill in, and will be saved using the `my-setting` key in Flow's store. There are other setting types available, including a `custom` type that will allow you to render a custom React component in the settings screen, like in the `my-custom-setting` setting, which renders a `div` element instead of an input.

10. Create a `server.ts` file in the `src` folder with the following content:

```typescript
import { definePlugin } from "@flowdev/plugin/server";

export default definePlugin((options) => {
  return {
    onStoreItemUpsert: async (itemKey) => {
      const item = await opts.store.getPluginItem(itemKey);
      console.log(itemKey, item?.value);
    },
    onCreateTask: async (task) => {
      console.log("Task created:", task);
      return task;
    }
  }
});
```

Notes:
- The `onStoreItemUpsert` function will be called whenever an item is upserted in the store. This can be used to react to changes in the store, for example when a setting is saved in the settings screen.
- The `onCreateTask` function will be called whenever a task is created. This can be used to modify the task before it is created, for example to show a modal to the user to ask for additional information.

11. Run `bun run build` in the `hello-world` folder to build the plugin in the `out` folder.
12. Create a `plugin.json` file in the `out` folder with the following content:

```json
{
  "slug": "hello-world",
  "version": "1.0.0",
  "web": true,
  "server": true
}
```

13. Commit the changes to your forked repository.
14. Create a new release in your forked repository with the tag `v1.0.0`.
15. Go to your Flow, and install the plugin using the "Install a plugin from a URL" option (link icon on the right) in the `/browse-plugins` page. Use the following URL to install the plugin:

```
https://cdn.jsdelivr.net/gh/<username>/flow/plugins/hello-world/out
```

Once installed, you will see the plugin popup in the settings where you will see the 2 settings you defined in the `web.tsx` file.

# Examples

For example plugins, you can check the `/plugins` directory of the [Flow repository](https://github.com/richardguerre/flow/tree/main/plugins), which contains official plugins for Flow.