# Flow Architecture Documentation

## System Overview

Flow is a monorepo-based personal daily planner with a plugin-extensible architecture. The system consists of a GraphQL API backend, two frontend clients (web and mobile PWA), and a dynamic plugin system.

```
┌─────────────┐         ┌─────────────┐
│  Web App    │         │ Mobile PWA  │
│  (React)    │         │   (React)   │
└──────┬──────┘         └──────┬──────┘
       │                       │
       │    GraphQL over SSE   │
       └───────────┬───────────┘
                   │
            ┌──────▼──────┐
            │   Server    │
            │  (Elysia +  │
            │   Pothos)   │
            └──────┬──────┘
                   │
        ┏━━━━━━━━━━┻━━━━━━━━━━┓
        ┃                      ┃
   ┌────▼────┐          ┌─────▼─────┐
   │ Prisma  │          │  Plugins  │
   │   ORM   │          │  System   │
   └────┬────┘          └─────┬─────┘
        │                     │
   ┌────▼────┐          ┌─────▼──────┐
   │ Postgres│          │ Plugin APIs│
   └─────────┘          └────────────┘
```

## Core Components

### 1. Server (`apps/server`)

**Tech Stack:**
- **Elysia**: Fast web framework for Bun
- **GraphQL Yoga**: GraphQL server
- **Pothos**: Code-first GraphQL schema builder
- **Prisma**: Database ORM
- **pg-boss**: Background job queue

**Key Responsibilities:**
- Serve GraphQL API over Server-Sent Events (SSE)
- Manage database operations via Prisma
- Coordinate plugin lifecycle
- Handle authentication/authorization
- Run background jobs (pg-boss)
- Serve built frontend assets in production

**Directory Structure:**
```
apps/server/src/
├── index.ts              # Entry point, Elysia server setup
├── graphql/              # GraphQL schema (Pothos)
│   ├── schema.ts         # Schema builder configuration
│   ├── types/            # GraphQL type definitions
│   ├── queries/          # Query resolvers
│   └── mutations/        # Mutation resolvers
├── plugins/              # Plugin system core
│   ├── loadPlugins.ts    # Plugin loading logic
│   └── ...
├── utils/                # Shared utilities
│   ├── prisma.ts         # Prisma client singleton
│   ├── pgBoss.ts         # Job queue setup
│   └── ...
└── prisma/               # Database schema & migrations
    ├── schema.prisma     # Prisma schema
    ├── migrations/       # Database migrations
    └── seed.ts           # Database seeding script
```

### 2. Web App (`apps/web`)

**Tech Stack:**
- **React**: UI framework
- **Relay**: GraphQL client with fragments
- **Vite**: Build tool and dev server
- **UnoCSS**: Runtime CSS framework
- **React Router**: Client-side routing

**Key Responsibilities:**
- Desktop-optimized UI
- Real-time GraphQL subscriptions
- Plugin UI integration
- Offline-capable (service worker)

**Directory Structure:**
```
apps/web/src/
├── main.tsx              # Entry point
├── App.tsx               # Root component
├── router.tsx            # React Router configuration
├── views/                # Page-level components
│   ├── DayView.tsx       # Main kanban board view
│   ├── SettingsView.tsx  # Settings page
│   └── ...
├── components/           # Reusable components
│   ├── TaskCard.tsx      # Task display component
│   ├── Modal.tsx         # Modal wrapper
│   └── ...
├── relay/                # Relay configuration
│   └── RelayEnvironment.ts
├── getPlugin/            # Plugin UI loading
└── __generated__/        # Relay generated artifacts
```

### 3. Mobile PWA (`apps/mobile-pwa`)

**Similar to web app but optimized for mobile:**
- Touch-optimized UI
- Smaller bundle size
- Mobile-specific navigation patterns
- Progressive Web App manifest

### 4. Plugin System

**Architecture**: Dynamic loading with hot-swapping support

**Plugin Structure:**
```
plugins/<plugin-name>/
├── index.ts              # Plugin entry point
├── package.json          # Plugin metadata
├── graphql/              # GraphQL extensions (optional)
│   ├── types.ts          # New types
│   ├── queries.ts        # New queries
│   └── mutations.ts      # New mutations
├── ui/                   # UI components (optional)
│   └── SettingsPanel.tsx
└── jobs/                 # Background jobs (optional)
    └── syncData.ts
```

**Plugin Capabilities:**
- Extend GraphQL schema with new types, queries, mutations
- Add UI panels to settings, day view, etc.
- Register background jobs
- Access database via Prisma
- Make external API calls
- Store plugin-specific configuration

**Built-in Plugins:**
- `essentials`: Core Flow functionality
- `google-calendar`: Google Calendar integration
- `linear`: Linear issue tracking
- `github`: GitHub integration
- `slack`: Slack notifications
- `gitstart`: Gitstart integration
- `repeating-tasks`: Recurring task management

### 5. Plugin Apps (`plugin-apps/`)

**Purpose**: Separate servers for plugin-specific needs (OAuth, webhooks)

Example: `plugin-apps/google-calendar/`
- Handles Google OAuth flow
- Receives webhook events
- Stores tokens securely
- Proxied via ngrok for local development

## Data Flow

### GraphQL Query Flow

```
1. User action in Web/Mobile
   ↓
2. Relay generates query with fragments
   ↓
3. Query sent via GraphQL SSE to Server
   ↓
4. Server resolves query through Pothos schema
   ↓
5. Pothos calls Prisma to fetch data
   ↓
6. Plugins extend data with custom fields
   ↓
7. Response sent back to client
   ↓
8. Relay normalizes data into cache
   ↓
9. React components re-render
```

### GraphQL Mutation Flow

```
1. User submits form/action
   ↓
2. Relay mutation called with input
   ↓
3. Mutation sent to Server
   ↓
4. Server validates input
   ↓
5. Pothos resolver updates database via Prisma
   ↓
6. Plugins react to mutation (hooks)
   ↓
7. Server publishes subscription updates
   ↓
8. Mutation response with updated data
   ↓
9. Relay updates cache optimistically
   ↓
10. All subscribed components re-render
```

### Plugin Loading Flow

```
1. Server starts
   ↓
2. loadPlugins() scans plugins/ directory
   ↓
3. Each plugin's index.ts is imported
   ↓
4. Plugin registers GraphQL extensions
   ↓
5. Plugin registers UI components (metadata)
   ↓
6. Plugin registers background jobs
   ↓
7. Pothos builds final schema
   ↓
8. Server ready to accept requests
```

### Hot-Reload Caveat

When a plugin is installed/modified while server is running with `--watch`:
- Bun detects file change and restarts
- Plugin state may become inconsistent
- **Solution**: Stop server, install plugin, restart server

## Database Schema Overview

### Core Models

```prisma
model User {
  id       String  @id @default(cuid())
  email    String  @unique
  tasks    Task[]
  notes    Note[]
  routines Routine[]
  // ... plugin-defined relations
}

model Task {
  id          String   @id @default(cuid())
  title       String
  completed   Boolean  @default(false)
  date        DateTime?
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  // ... plugin-defined fields
}

model Note {
  id        String   @id @default(cuid())
  content   String
  date      DateTime
  userId    String
  user      User     @relation(fields: [userId], references: [id])
}

model Routine {
  id          String        @id @default(cuid())
  name        String
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  steps       RoutineStep[]
}
```

**Plugin Extensions**: Plugins can add their own models with relations to core models.

## Technology Choices

### Why Bun?

- Fast JavaScript runtime (faster than Node.js)
- Built-in package manager (replaces npm/yarn)
- Native TypeScript support
- Good developer experience

### Why Relay over Apollo?

- Better performance with normalized cache
- Co-located queries with fragments
- Strong TypeScript integration
- Compile-time optimizations

### Why UnoCSS over Tailwind?

- **Runtime generation**: Plugins can add custom styles
- **Hot-swappable plugins** need CSS generated dynamically
- Tailwind requires all classes known at build time
- UnoCSS can generate classes on-the-fly in browser

### Why Pothos over SDL/Schema-first?

- Type-safe resolvers (TypeScript-first)
- Better integration with Prisma
- Plugin system easier to implement
- Less boilerplate

### Why Elysia over Express?

- Optimized for Bun
- Better performance
- Modern API design
- TypeScript-first

## GraphQL Schema Design

### Schema Organization

```typescript
// apps/server/src/graphql/schema.ts
const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Context: Context;
  Scalars: {
    Date: { Input: Date; Output: Date };
    DateTime: { Input: Date; Output: Date };
  };
}>({
  plugins: [
    PrismaPlugin,
    RelayPlugin,
    ScopeAuthPlugin,
    // ... other plugins
  ],
});

// Define types
builder.prismaObject("Task", {
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    completed: t.exposeBoolean("completed"),
    // ... other fields
  }),
});

// Define queries
builder.queryType({
  fields: (t) => ({
    tasks: t.prismaField({
      type: ["Task"],
      resolve: async (query, root, args, ctx) => {
        return ctx.prisma.task.findMany({ ...query });
      },
    }),
  }),
});

// Define mutations
builder.mutationType({
  fields: (t) => ({
    updateTask: t.prismaField({
      type: "Task",
      args: {
        id: t.arg.id({ required: true }),
        title: t.arg.string(),
        completed: t.arg.boolean(),
      },
      resolve: async (query, root, args, ctx) => {
        return ctx.prisma.task.update({
          ...query,
          where: { id: args.id },
          data: { title: args.title, completed: args.completed },
        });
      },
    }),
  }),
});
```

### Relay Conventions

- All object types implement `Node` interface
- Global IDs for cache normalization
- Connections for pagination (`TaskConnection`, `TaskEdge`)
- Mutations return updated objects

## Background Jobs (pg-boss)

Flow uses **pg-boss** for background job processing:

```typescript
// Register a job
await pgBoss.send("sync-google-calendar", {
  userId: user.id,
});

// Process jobs
await pgBoss.work("sync-google-calendar", async (job) => {
  const { userId } = job.data;
  // ... sync logic
});
```

**Use Cases:**
- Syncing external data (Google Calendar, Linear, etc.)
- Sending notifications
- Cleanup tasks
- Scheduled routines

## Real-time Updates

Flow uses **GraphQL Subscriptions over SSE** for real-time updates:

```typescript
// Server: Publish update
pubsub.publish("task-updated", { taskId: task.id });

// Client: Subscribe to updates
const subscription = graphql`
  subscription TaskUpdatedSubscription {
    taskUpdated {
      id
      title
      completed
    }
  }
`;
```

## Authentication & Authorization

**Current State**: Basic user authentication
- User stored in context
- Scope-based authorization via Pothos plugin
- Future: OAuth for external integrations

## Development Workflow Integration

### After Schema Changes

1. Modify Prisma schema: `apps/server/prisma/schema.prisma`
2. Create migration: `bun db:migrate`
3. Apply migration: `bun db:dev`
4. Update GraphQL schema: `apps/server/src/graphql/`
5. **Regenerate Relay artifacts**: `bun relay` (from root)
6. Update frontend components to use new fields

### Adding a New Feature

1. Design database schema changes (if needed)
2. Implement backend (GraphQL resolvers)
3. Implement frontend (React components)
4. Test manually in browser
5. Format code: `bun run format`
6. Commit changes

## Performance Considerations

### Query Optimization

- Use Relay fragments to minimize over-fetching
- Prisma query optimization (select only needed fields)
- Database indexes on frequently queried fields

### Bundle Size

- Code splitting with dynamic imports
- Lazy load routes and heavy components
- UnoCSS purges unused styles (in production)

### Caching

- Relay normalized cache (client-side)
- Consider Redis for server-side caching (future)

## Security Considerations

- User data scoped by user ID
- Plugin isolation (future: sandboxing)
- OAuth tokens stored securely
- Input validation on all mutations

## Deployment

**Current**: Self-hosted
- Build server and apps: `bun run build`
- Bundle includes static assets
- Single deployment artifact
- Bun serves everything

**Future**: Cloud deployment options
- Docker containerization
- Vercel for frontend
- Railway/Render for backend
- Managed Postgres

## Future Architecture Enhancements

- [ ] Plugin sandboxing for security
- [ ] Plugin marketplace
- [ ] Multi-user support
- [ ] End-to-end encryption
- [ ] Offline-first with conflict resolution
- [ ] Native mobile apps (React Native)
