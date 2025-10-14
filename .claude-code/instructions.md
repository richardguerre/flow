# Flow Project - Claude Code Instructions

## Project Overview

Flow is a personal daily planner built to keep users in the flow state. It's a monorepo built with:

- **Runtime**: Bun
- **Monorepo**: Turbo
- **Frontend**: React with Relay (GraphQL client)
- **Backend**: Elysia server with Pothos GraphQL, Prisma ORM
- **Database**: PostgreSQL
- **Styling**: UnoCSS (chosen over Tailwind for runtime plugin support)
- **Apps**: `web` (desktop), `mobile-pwa` (mobile), `server` (GraphQL API)
- **Extensibility**: Plugin-based architecture

## Critical Development Workflows

### 1. Starting Development Servers

**Standard workflow:**
```bash
# In one terminal (server)
cd apps/server && bun dev

# In another terminal (web frontend)
cd apps/web && bun dev
```

**Plugin development workflow:**
```bash
# Start server (in apps/server)
bun dev

# Start web frontend (in apps/web)
bun dev

# Start plugin dev server (in apps/plugin-dev)
bun dev

# If plugin needs OAuth, start its plugin-app server and pipe through ngrok
cd plugin-apps/<plugin-name> && bun dev
# Then: ngrok http <port>
```

### 2. Installing Plugins (Special Handling Required)

**IMPORTANT**: When installing a plugin, the server's hot-reload causes inconsistent state.

**Process:**
1. Stop the server (if running)
2. Remove `--watch` flag from the dev command in `apps/server/package.json` temporarily
3. Install the plugin
4. Stop the server
5. Add back the `--watch` flag to `apps/server/package.json`
6. Restart the server

**OR** install the plugin while the server is not running, then start it normally.

### 3. GraphQL Schema Changes

**After ANY change to GraphQL schema:**
```bash
# From root directory
bun relay
```

This regenerates Relay artifacts that the web app depends on. DO NOT skip this step after schema changes.

### 4. Database Operations

**Running migrations:**
```bash
bun db:dev      # Run existing migrations
bun db:reset    # Reset database (includes seeding)
bun db:seed     # Seed database with test data
```

**Setting up database (first time):**
```bash
cd apps/server
bun run setup:db  # Creates 'flow' database in local Postgres
cp .env.example .env  # Copy environment file
# Edit .env to set DATABASE_URL if needed (default: postgres://postgres:postgres@localhost:5432/flow)
bun db:reset  # Run migrations and seed
```

### 5. Before Committing Code

**ALWAYS run:**
```bash
bun run format
```

This runs Prettier to format all code. Never commit without formatting first.

## Code Conventions & Style

### 1. No Object Destructuring (except React hooks)

**❌ BAD:**
```tsx
const MyComponent = ({ value, name }) => {
  return <div>{value} {name}</div>;
};

const MyComponent = (props) => {
  const { value, name } = props;
  return <div>{value} {name}</div>;
};
```

**✅ GOOD:**
```tsx
const MyComponent = (props) => {
  // Destructuring React hooks is ALLOWED
  const { symbol } = useLocaleCurrency();
  const [value, setValue] = useState(props.value);

  return <div>{props.value} {props.name} {symbol}</div>;
};
```

**Reasoning**: Destructuring makes code harder to read and refactor. Array destructuring is fine.

### 2. Testing

**DO NOT write tests** unless explicitly asked. The test infrastructure needs modernization in a future dedicated PR.

### 3. Formatting

- Prettier is configured with `printWidth: 100`
- Always run `bun run format` before committing

## Architecture

### Monorepo Structure

```
flow/
├── apps/
│   ├── server/          # Elysia + GraphQL API (Pothos/Prisma)
│   ├── web/             # React SPA for desktop
│   ├── mobile-pwa/      # React PWA for mobile
│   ├── plugin-dev/      # Plugin development server
│   └── docs/            # Documentation site
├── packages/
│   ├── ui/              # Shared UI components
│   └── calendar/        # Calendar utilities
├── plugins/             # Core and user plugins
├── plugin-apps/         # Plugin servers (e.g., OAuth handlers)
└── .claude-code/        # Claude Code configuration
```

### Key Technologies

- **GraphQL**: Schema-first with Pothos, Relay on frontend
- **Database**: Prisma ORM with PostgreSQL
- **Styling**: UnoCSS (runtime CSS for plugin support)
- **Build**: Turbo for monorepo orchestration, Bun for JS runtime

### Plugin System

Plugins extend Flow's functionality. They can:
- Add new GraphQL types, queries, mutations
- Provide UI components
- Run background jobs
- Integrate with external services (OAuth, APIs)

See `.claude-code/plugin-development.md` for detailed plugin workflows.

## Common Commands

```bash
# Development
bun dev                    # Start all apps in dev mode (from root)
cd apps/server && bun dev  # Start server only
cd apps/web && bun dev     # Start web app only

# Database
bun db:dev                 # Run migrations
bun db:reset               # Reset and seed database
bun db:seed                # Seed database

# GraphQL
bun relay                  # Regenerate Relay artifacts (after schema changes)

# Code Quality
bun run format             # Format all code with Prettier
bun run format:check       # Check formatting without modifying

# Building
bun run build              # Build all apps for production
bun run web:build          # Build web app only
bun run mobile-pwa:build   # Build mobile PWA only

# Utilities
bun run clean              # Remove all node_modules
bun run unocss             # Generate UnoCSS styles
```

## Typical Task Workflows

### Adding a Feature to Web + Server

1. Modify GraphQL schema in `apps/server/src/graphql/`
2. Run `bun relay` to regenerate Relay artifacts
3. Implement server resolvers
4. Implement frontend components in `apps/web/src/`
5. Run `bun run format` before committing
6. Test manually (no automated tests yet)

### Creating a New Plugin

1. Start plugin dev environment (server + web + plugin-dev)
2. Create plugin structure in `plugins/`
3. Implement plugin GraphQL extensions, UI, etc.
4. If OAuth needed, create plugin-app in `plugin-apps/`
5. Use ngrok for OAuth callback testing
6. Install plugin (follow special installation workflow above)

### Database Schema Changes

1. Modify `apps/server/prisma/schema.prisma`
2. Run `bun db:dev` to create migration
3. If GraphQL schema affected, run `bun relay`
4. Update server resolvers if needed
5. Update frontend queries if needed

## File Locations

- **GraphQL Schema**: `apps/server/src/graphql/`
- **Database Schema**: `apps/server/prisma/schema.prisma`
- **Web App**: `apps/web/src/`
- **Server API**: `apps/server/src/`
- **Plugins**: `plugins/`
- **Shared UI**: `packages/ui/`

## Important Notes

- **Relay config**: Kept at root due to VS Code extension requirements
- **UnoCSS over Tailwind**: Runtime CSS generation for plugin styling
- **No emoji usage**: Unless explicitly requested by user
- **Bun over npm/yarn**: Always use `bun` commands
- **Hot-reload caveat**: Plugin installation breaks server hot-reload

## Questions or Issues?

- Check `README.md` for setup instructions
- See `.claude-code/architecture.md` for system design
- See `.claude-code/plugin-development.md` for plugin details
- Open issues at: https://github.com/richardguerre/flow/issues
