# Flow 🌊

> Stay in the flow.

## What is flow?

Flow is a personal daily planner to keep you in the flow. 

Features:

- 📊 Kanban board: drag and drop tasks between days.
- 🧾 Lists & items: add items to lists and drag them into your day once you're ready to do them.
- 📕 Routines: start your day the right way with a morning routine.
- 🧩 Plugin-based: you can install and create plugins to extend Flow's functionality.
- 💯 Open source: Flow is open source project, so you can contribute to it and make it better.

# Contributing

If you have suggestions for how Flow could be improved, or want to report a bug, [open an issue](https://github.com/richardguerre/flow/issues/new)! All contributions are welcome.


## Getting started with GitHub Codespaces

You can create a GitHub Codespace from this repository by clicking the green button at the top of the page and selecting "New codespace". This will create a Codespace with with everything you need to start developing on Flow:

- Starts a Postgres database on port 5432
- Seeds the database with some data (go to apps/server/prisma/seed.ts to see what it creates).
- Starts the `server` app in watch on port 4000
- Starts the `web` app in watch on port 3000 and connects to the `server` app on port 4000

## Getting started

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start a Postgres database
4. Copy the `.env.example` file in `apps/server` into a `.env` file and modify the `DATABASE_URL` environment variable to point to your database
   ```bash
    cp apps/server/.env.example apps/server/.env
    ```
5. Run the migrations
   ```bash
   npm run db:dev
   ```
   or reset it if you have already run it before. This will also seed the database with some data so you can skip the next step.
   ```bash
   npm run db:reset
   ```
6. (optional) Seed the database
   ```bash
   npm run db:seed
   ```
7. Copy the `.env.example` file in `apps/web` into a `.env` file. No need to modify anything.
   ```bash
    cp apps/web/.env.example apps/web/.env
    ```
8. Start the `server` and `web` app
   ```bash
   npm run dev
   ```

## VS Code Extensions

If you are using VS Code, you will be prompted to install the recommended extensions, which you can find in `.vscode/extensions.json`. These extensions are:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting.
- [Relay](https://marketplace.visualstudio.com/items?itemName=meta.relay) for [Relay GraphQL](https://relay.dev) support.
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) for [Tailwind CSS](https://tailwindcss.com) support.
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) for [Prisma](https://www.prisma.io) support.

## Running tests

To run tests, run the following command:

```bash
npm run test
```

For now there are only tests in the `server` app, so you can also run them directly from the `server` app:

```bash
cd apps/server
npm run test
```

# FAQ/Pointers

## Why is relay.config.json at the root?

I couldn't get the VS Code extension to work with the `relay.config.json` file in the `apps/web` directory. This also means that the relay-compiler is run from the root directory, hence why the `relay` script in `apps/web` is `cd ../.. && relay-compiler`.

## Don't destructure objects, except with React hooks

I've found that destructuring objects can make it harder to read and refactor code. This does not apply to destructuring arrays. Example:

```js
// ❌ Bad
const MyComponent = ({ value }) => {
  return <div>{value}</div>;
};

// ✅ Good
const MyComponent = (props) => {
  // destructuring objects returned by React hooks is fine
  const { symbol } = useLocaleCurrency();
  return <div>{props.myProp} {symbol}</div>;
};
```
