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