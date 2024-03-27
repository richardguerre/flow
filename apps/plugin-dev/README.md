# Plugin development app

This "app" exposes the plugins directory as a static directory so that it can be used in place of a CDN for plugin development.

It's not really an app as it simply uses Vercel's serve package to expose the plugins directory. It's a a package in the monorepo so that turborepo can run the dev script when running `bun dev` from the root.
