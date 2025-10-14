# Plugin Development Server

This "app" exposes the plugins directory as a static directory so that it can be used in place of a CDN for plugin development.

## Overview

The plugin-dev server serves plugin files from the `plugins/` directory with CORS enabled, allowing the main Flow app to load plugin code dynamically during development. This enables hot-reload for plugin development without needing to restart the server.

## How It Works

Uses Vercel's `serve` package to expose the plugins directory on `http://localhost:4040` with CORS enabled. It's a package in the monorepo so that turborepo can run the dev script when running `bun dev` from the root.

## Usage

### Start Plugin Dev Server

```bash
# From this directory
bun dev

# From root (starts all apps including this)
bun dev
```

Server runs on `http://localhost:4040`.

### Plugin Development Workflow

When developing plugins, you need **three** servers running:

1. **Server** (backend + GraphQL): `cd apps/server && bun dev`
2. **Web** (frontend): `cd apps/web && bun dev`
3. **Plugin Dev** (serves plugin files): `cd apps/plugin-dev && bun dev`

The web app loads plugin UI components from `http://localhost:4040/plugins/<plugin-name>/...` during development.

## Why This Exists

- **Hot Reload**: Changes to plugin files are immediately available without server restart
- **CORS**: Allows cross-origin requests from web app to plugin files
- **Development Speed**: Edit plugin code and see changes instantly in browser
- **CDN Simulation**: Simulates how plugins would be served from a CDN in production

## Plugin Installation Caveat

**IMPORTANT**: Installing new plugins while the main server is running with `--watch` flag causes instability.

**Recommended workflow**:
1. Stop the main server
2. Remove `--watch` flag from `apps/server/package.json`
3. Install plugin
4. Stop server
5. Restore `--watch` flag
6. Restart all servers

See `../../.claude-code/plugin-development.md` for complete plugin development guide.

## Configuration

The server configuration is minimal:

```json
{
  "scripts": {
    "dev": "bunx serve --cors ../../plugins -p 4040"
  }
}
```

- `--cors`: Enables CORS for cross-origin requests
- `../../plugins`: Serves the plugins directory (relative to this app)
- `-p 4040`: Runs on port 4040

## Working with Claude Code

See project root `.claude-code/` directory for comprehensive documentation on:
- Plugin development workflows
- Architecture details
- Code conventions

Specifically, see `.claude-code/plugin-development.md` for the complete plugin development guide.
