# Flow Mobile PWA

Mobile-optimized Progressive Web App for Flow, built with React + TypeScript + Vite.

## Overview

This is the mobile version of Flow, optimized for touch interactions and mobile screens. It shares most of the codebase architecture with the web app but with mobile-specific UI components and navigation patterns.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Relay** - GraphQL client
- **UnoCSS** - Runtime CSS framework
- **React Router** - Client-side routing

## Development

### Start Dev Server

```bash
# From this directory
bun dev

# From root (starts all apps)
bun dev
```

App runs on `http://localhost:3001` (or next available port).

### Prerequisites

Make sure the server is running:
```bash
cd ../server
bun dev
```

## Key Differences from Web App

- Touch-optimized interactions
- Mobile-specific navigation patterns
- Smaller bundle size
- Progressive Web App manifest
- Mobile-specific viewport settings

## Code Conventions

**Important**: Follow Flow's code conventions:
- **No object destructuring** (except React hooks and arrays) - see `../../.claude-code/conventions.md`
- Always run `bun relay` after GraphQL schema changes
- Always run `bun run format` before committing

See `../../.claude-code/instructions.md` for complete development workflows.

## Building

```bash
# From root
bun run mobile-pwa:build

# Or from this directory
bun run build
```

Build output goes to `dist/`, which is copied to `../server/dist/mobile-pwa` for production serving.

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Root component
├── router.tsx            # React Router configuration
├── views/                # Page-level components
├── components/           # Reusable components
├── relay/                # Relay configuration
└── __generated__/        # Relay generated artifacts
```

## Working with Claude Code

See project root `.claude-code/` directory for comprehensive documentation on:
- Development workflows
- Architecture details
- Code conventions
- Plugin development

## Learn More

- [React Documentation](https://react.dev)
- [Relay Documentation](https://relay.dev)
- [Vite Documentation](https://vitejs.dev)
- [UnoCSS Documentation](https://unocss.dev)
