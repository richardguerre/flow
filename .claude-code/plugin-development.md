# Plugin Development Guide

## Plugin System Overview

Flow's plugin system allows extending the application with custom functionality without modifying the core codebase. Plugins can:

- Add new GraphQL types, queries, and mutations
- Extend existing types with additional fields
- Add UI components to various parts of the app
- Register background jobs
- Integrate with external services (OAuth, webhooks)
- Store plugin-specific data

## Plugin Development Workflow

### 1. Start Development Servers

For plugin development, you need **three** servers running:

```bash
# Terminal 1: Server (backend + GraphQL)
cd apps/server
bun dev

# Terminal 2: Web app (frontend)
cd apps/web
bun dev

# Terminal 3: Plugin dev server (serves plugin files)
cd apps/plugin-dev
bun dev
```

The plugin dev server serves plugin files from `plugins/` directory on `http://localhost:4040` with CORS enabled, allowing hot-reload during development.

### 2. Create a New Plugin

```bash
# Create plugin directory
mkdir plugins/my-plugin

# Create basic structure
cd plugins/my-plugin
touch index.ts package.json
mkdir src
```

**Minimal `package.json`:**

```json
{
  "name": "@flowdev/plugin-my-plugin",
  "version": "0.1.0",
  "description": "My custom Flow plugin",
  "main": "out/index.js",
  "scripts": {
    "dev": "echo 'Development handled by plugin-dev server'"
  },
  "peerDependencies": {
    "@flowdev/server": "workspace:*"
  }
}
```

**Minimal `index.ts`:**

```typescript
import { PluginSchemaInput, PluginUIInput } from "@flowdev/server";

export const plugin = {
  slug: "my-plugin",
  name: "My Plugin",
};

export const onSchema = (input: PluginSchemaInput) => {
  const { builder, db } = input;

  // Define GraphQL schema extensions here
};

export const onUI = (input: PluginUIInput) => {
  // Define UI extensions here
};
```

### 3. Install Plugin Locally

**IMPORTANT**: Installing plugins during hot-reload causes server instability.

**Recommended Process:**

1. **Stop the server** (Ctrl+C in Terminal 1)
2. **Temporarily remove `--watch` flag** from `apps/server/package.json`:
   ```json
   {
     "scripts": {
       "dev": "NODE_ENV=development bun run src/index.ts"
       // (removed --watch)
     }
   }
   ```
3. **Install the plugin** (modify server code to load it, or use plugin manager)
4. **Stop the server again**
5. **Restore `--watch` flag**:
   ```json
   {
     "scripts": {
       "dev": "NODE_ENV=development bun --watch run src/index.ts"
     }
   }
   ```
6. **Restart the server**

**Alternative**: Install plugin with server stopped, then start normally.

### 4. Development Cycle

1. Edit plugin files in `plugins/my-plugin/`
2. Plugin dev server auto-serves updated files
3. Refresh browser to see UI changes
4. For GraphQL changes, restart server (watch mode picks it up)
5. Run `bun relay` if plugin adds/modifies GraphQL types used in web app

## Plugin Structure Deep Dive

### Complete Plugin Example

```typescript
// plugins/my-plugin/index.ts
import { PluginSchemaInput, PluginUIInput } from "@flowdev/server";

export const plugin = {
  slug: "my-plugin",
  name: "My Plugin",
  description: "Does something useful",
  author: "@yourusername",
  version: "0.1.0",
};

// GraphQL Schema Extensions
export const onSchema = (input: PluginSchemaInput) => {
  const { builder, db, pubsub } = input;

  // 1. Add a new type
  builder.prismaObject("MyPluginData", {
    fields: (t) => ({
      id: t.exposeID("id"),
      value: t.exposeString("value"),
      userId: t.exposeString("userId"),
    }),
  });

  // 2. Extend existing types
  builder.prismaObjectField("User", "myPluginData", (t) =>
    t.prismaField({
      type: ["MyPluginData"],
      resolve: async (query, user, args, ctx) => {
        return ctx.prisma.myPluginData.findMany({
          ...query,
          where: { userId: user.id },
        });
      },
    })
  );

  // 3. Add queries
  builder.queryField("myPluginQuery", (t) =>
    t.prismaField({
      type: ["MyPluginData"],
      args: {
        limit: t.arg.int({ required: false }),
      },
      resolve: async (query, root, args, ctx) => {
        return ctx.prisma.myPluginData.findMany({
          ...query,
          where: { userId: ctx.user.id },
          take: args.limit || 10,
        });
      },
    })
  );

  // 4. Add mutations
  builder.mutationField("createMyPluginData", (t) =>
    t.prismaField({
      type: "MyPluginData",
      args: {
        value: t.arg.string({ required: true }),
      },
      resolve: async (query, root, args, ctx) => {
        const data = await ctx.prisma.myPluginData.create({
          ...query,
          data: {
            value: args.value,
            userId: ctx.user.id,
          },
        });

        // Publish real-time update
        pubsub.publish("my-plugin-data-created", data);

        return data;
      },
    })
  );

  // 5. Add subscriptions
  builder.subscriptionField("myPluginDataCreated", (t) =>
    t.field({
      type: "MyPluginData",
      subscribe: (root, args, ctx) => {
        return pubsub.subscribe("my-plugin-data-created");
      },
      resolve: (data) => data,
    })
  );
};

// UI Extensions
export const onUI = (input: PluginUIInput) => {
  const { addSettingsSection, addDayViewPanel } = input;

  // Add settings panel
  addSettingsSection({
    section: "my-plugin",
    label: "My Plugin Settings",
    render: () => import("./ui/SettingsPanel"),
  });

  // Add panel to day view
  addDayViewPanel({
    id: "my-plugin-panel",
    label: "My Plugin Data",
    render: () => import("./ui/DayViewPanel"),
  });
};
```

### UI Components

**Settings Panel Example:**

```typescript
// plugins/my-plugin/ui/SettingsPanel.tsx
import { graphql, useFragment } from "react-relay";
import { useState } from "react";

const fragment = graphql`
  fragment SettingsPanel_data on User {
    id
    myPluginData {
      id
      value
    }
  }
`;

const SettingsPanel = (props) => {
  const data = useFragment(fragment, props.dataRef);
  const [value, setValue] = useState("");

  const handleSave = async () => {
    // Call mutation to save settings
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">My Plugin Settings</h2>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button onClick={handleSave} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Save
      </button>

      <div className="mt-4">
        <h3 className="font-semibold">Existing Data:</h3>
        <ul>
          {data.myPluginData.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsPanel;
```

### Database Schema for Plugins

**Add to `apps/server/prisma/schema.prisma`:**

```prisma
model MyPluginData {
  id     String @id @default(cuid())
  value  String
  userId String
  user   User   @relation(fields: [userId], references: [id])

  @@index([userId])
}

// Update User model
model User {
  // ... existing fields
  myPluginData MyPluginData[]
}
```

**Then run migrations:**

```bash
cd apps/server
bun db:migrate  # Create migration
bun db:dev      # Apply migration
```

## Plugin with OAuth (External Integration)

Some plugins need OAuth for external services. This requires a dedicated server in `plugin-apps/`.

### 1. Create Plugin App

```bash
mkdir plugin-apps/my-plugin
cd plugin-apps/my-plugin
touch index.ts package.json
```

**`package.json`:**

```json
{
  "name": "@flowdev/plugin-app-my-plugin",
  "version": "0.1.0",
  "scripts": {
    "dev": "bun --watch run index.ts"
  },
  "dependencies": {
    "elysia": "^0.7.15"
  }
}
```

**`index.ts`:**

```typescript
import { Elysia } from "elysia";

const app = new Elysia()
  .get("/auth/callback", async ({ query }) => {
    const { code } = query;
    // Exchange code for token
    // Store token in database
    return { success: true };
  })
  .listen(4050);

console.log("Plugin app listening on http://localhost:4050");
```

### 2. Use ngrok for OAuth Testing

OAuth providers require a public URL for callbacks. Use ngrok:

```bash
# Terminal 4: ngrok tunnel
ngrok http 4050
```

This gives you a public URL like `https://abc123.ngrok.io`.

**Configure OAuth provider** with callback URL:
```
https://abc123.ngrok.io/auth/callback
```

### 3. Plugin OAuth Flow

```typescript
// plugins/my-plugin/index.ts
export const onSchema = (input: PluginSchemaInput) => {
  const { builder } = input;

  builder.mutationField("myPluginConnect", (t) =>
    t.field({
      type: "String",
      resolve: async (root, args, ctx) => {
        // Return OAuth authorization URL
        const authUrl = `https://oauth-provider.com/authorize?client_id=...&redirect_uri=https://abc123.ngrok.io/auth/callback`;
        return authUrl;
      },
    })
  );
};
```

## Background Jobs with Plugins

Plugins can register background jobs using pg-boss:

```typescript
export const onSchema = (input: PluginSchemaInput) => {
  const { registerJob, pgBoss } = input;

  // Register job handler
  registerJob("my-plugin-sync", async (job) => {
    const { userId } = job.data;
    // Perform sync logic
    console.log(`Syncing data for user ${userId}`);
  });

  // Schedule job (e.g., from a mutation)
  builder.mutationField("triggerSync", (t) =>
    t.field({
      type: "Boolean",
      resolve: async (root, args, ctx) => {
        await pgBoss.send("my-plugin-sync", { userId: ctx.user.id });
        return true;
      },
    })
  );
};
```

## Testing Plugins

### Manual Testing

1. **GraphQL Playground**: http://localhost:4000/graphql
   - Test queries, mutations, subscriptions
   - Inspect schema with autocomplete

2. **Web App**: http://localhost:3000
   - Test UI components
   - Check real-time updates
   - Verify data persistence

3. **Database Inspection**: Use TablePlus, pgAdmin, or psql
   - Check data is saved correctly
   - Verify relations

### Debugging

```typescript
// Add console logs in plugin code
export const onSchema = (input: PluginSchemaInput) => {
  console.log("[my-plugin] Registering schema...");

  builder.queryField("myQuery", (t) =>
    t.field({
      type: "String",
      resolve: async (root, args, ctx) => {
        console.log("[my-plugin] myQuery called with:", args);
        return "result";
      },
    })
  );
};
```

Check server logs in Terminal 1 for debug output.

## Plugin Best Practices

### 1. Naming Conventions

- **Plugin slug**: kebab-case (`my-plugin`, `google-calendar`)
- **Package name**: `@flowdev/plugin-<slug>`
- **GraphQL types**: PascalCase with plugin prefix (`MyPluginData`)
- **GraphQL fields**: camelCase with plugin prefix (`myPluginData`)

### 2. Database Models

- Prefix with plugin name: `MyPluginData`, `MyPluginConfig`
- Always relate to `User` for multi-user support
- Add indexes on foreign keys

### 3. GraphQL Schema

- Namespace fields to avoid conflicts
- Use Relay conventions (Node interface, connections)
- Document queries/mutations with descriptions

### 4. UI Components

- Follow Flow's design system (UnoCSS classes)
- Keep components performant (use Relay fragments)
- Handle loading and error states

### 5. Error Handling

```typescript
builder.mutationField("myMutation", (t) =>
  t.field({
    type: "MyType",
    resolve: async (root, args, ctx) => {
      try {
        // Logic here
        return result;
      } catch (error) {
        console.error("[my-plugin] Error:", error);
        throw new Error("Failed to perform action");
      }
    },
  })
);
```

## Example Plugins to Study

### 1. **essentials** (`plugins/essentials`)
- Core functionality (tasks, notes, routines)
- Good reference for standard patterns

### 2. **google-calendar** (`plugins/google-calendar`)
- OAuth flow
- External API integration
- Background sync jobs

### 3. **repeating-tasks** (`plugins/repeating-tasks`)
- Extending core models
- Complex business logic
- Scheduled jobs

### 4. **linear** (`plugins/linear`)
- Webhook handling
- Two-way sync
- Rich UI components

## Common Plugin Development Issues

### Issue: Server crashes on plugin install

**Cause**: Hot-reload while plugin files changing

**Solution**: Follow plugin installation workflow (remove --watch, install, restore --watch)

### Issue: GraphQL schema not updating

**Cause**: Schema cached or Relay artifacts not regenerated

**Solution**:
1. Restart server
2. Run `bun relay` from root
3. Hard refresh browser (Cmd+Shift+R)

### Issue: UI component not loading

**Cause**: Plugin dev server not running or import path wrong

**Solution**:
1. Ensure `apps/plugin-dev` is running
2. Check browser console for 404 errors
3. Verify `render: () => import("./ui/Component")` path is correct

### Issue: Database relation errors

**Cause**: Missing migration or incorrect Prisma schema

**Solution**:
1. Check `schema.prisma` for correct relations
2. Run `bun db:migrate` and `bun db:dev`
3. Regenerate Prisma client: `bun run db:gen`

### Issue: OAuth callback not working

**Cause**: ngrok URL expired or callback URL misconfigured

**Solution**:
1. Check ngrok is still running
2. Update OAuth provider with current ngrok URL
3. Ensure plugin-app server is running

## Plugin Distribution (Future)

Currently plugins are developed locally. Future plans:

- **Plugin marketplace**: Browse and install plugins from web UI
- **npm packages**: Publish plugins to npm registry
- **Sandboxing**: Isolate plugin execution for security
- **Permissions**: Fine-grained access control for plugins

## Additional Resources

- **Pothos docs**: https://pothos-graphql.dev/
- **Relay docs**: https://relay.dev/
- **Prisma docs**: https://www.prisma.io/docs/
- **UnoCSS docs**: https://unocss.dev/

## Questions or Help

- Check existing plugins in `plugins/` for examples
- Open an issue: https://github.com/richardguerre/flow/issues
- Join discussions: https://github.com/richardguerre/flow/discussions
