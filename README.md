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

When you open the web app in the browser, you may see nothing or "Hello world". To fix this you will need to:

1. Open the web app at http://localhost:3000
2. Add a `token` as an item in localStorage and refresh. The value can be any string (authentication is not done yet). This is used to authenticate the user. You can do this in the browser console:
    ```js
    localStorage.setItem('token', 'my-token');
    ```
3. You should now see the app with some tasks already created.

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
9. Open the web app at http://localhost:3000
10. Add a `token` as an item in localStorage and refresh. The value can be any string (authentication is not done yet). This is used to authenticate the user. You can do this in the browser console:
    ```js
    localStorage.setItem('token', 'my-token');
    ```
11. You should now see the app with some tasks already created.

## VS Code Extensions

If you are using VS Code, you will be prompted to install the recommended extensions, which you can find in `.vscode/extensions.json`. These extensions are:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting.
- [Relay](https://marketplace.visualstudio.com/items?itemName=meta.relay) for [Relay GraphQL](https://relay.dev) support.
- [UnoCSS](https://marketplace.visualstudio.com/items?itemName=bradlc.antfu.unocss) for [UnoCSS](https://unocss.dev) support.
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

// ❌ Bad
const MyComponent = (props) => {
  const { value } = props;
  return <div>{value}</div>;
};

// ✅ Good
const MyComponent = (props) => {
  // destructuring objects returned by React hooks is fine
  const { symbol } = useLocaleCurrency();
  return <div>{props.myProp} {symbol}</div>;
};

// ✅ Good
const MyComponent = (props) => {
  // destructuring arrays is fine
  const [value, setValue] = useState(props.value);
  return <div>{value}</div>;
};
```

## Why UnoCSS instead of TailwindCSS?

I was originally using TailwindCSS, but as I later realized I wanted/needed plugins to also have access to the same theme as the main app, I decided to switch to UnoCSS. This is because UnoCSS can be run at runtime, so plugins can add classes that the main app may not use directly, but that plugins can use. This is not possible with TailwindCSS, as it needs to be compiled at build time so all classes would need to be known at build time (not possible if hot swapping plugins).
