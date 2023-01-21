# Flow 🌊

> Stay in the flow.

## What is flow?

Flow is a daily planner to keep you in the flow. It's an open-source project you can self-host, so you can change anything about it.

## Flow vs Sunsama

If you've used Sunsama, you'll notice that Flow is very similar. The main difference is that Flow is an open-source project you self-host. This means that you can run your own instance of Flow and have full control over it and your data.

It was primarily created as Sunsama does not have a Linear integration and I wanted to be able to easily import Linear issues into my daily plan.

### Differences

The following are the main differences Flow has with Sunsama:

- It allows you to cancel a task instead of deleting it.
- It has a Linear integration.
- Regular tasks can't be scheduled. Instead you can create calendar events to schedule them.

## Initial Release

The intial release of Flow includes the following features:

- Being able to create and manage regular tasks
- Being able to create recurring tasks (e.g. every Monday)
- Create tasks from external items such as Linear issues or Google Calendar events.
- Having daily rituals, one to start the day and one to end the day.

## Roadmap

The following are features I plan to add to Flow:

- Simplify setting it up
- Slack integration to sync changes back to Slack.
- Being able to create and manage calendar events from within Flow.
- Hook to automatically create tasks from external items
- Notifications aggregator (e.g. it automatically creates tasks like "Review 3 notifications in GitHub")

## Why Typescript?

Typescript, although not the most loved language, strikes a good balance of:

- Being a good first language to learn, making it easy to onboard new contributors that may not have much experience with programming.
- Being typesafe, which makes it easier to refactor with peace in mind.
- Having a decent ecosystem of tools and libraries.
- Being a good language to write a web application in, for both the frontend and backend.

It is also the language I am most comfortable working with and have the most experience with.

## Contribute

If you have suggestions for how Flow could be improved, or want to report a bug, open an issue! Any and all contributions are welcome.


### Don't destructure objects, excepts React with hooks

I've found that destructuring objects can make it harder to read and refactor code. This does not apply to destructuring arrays. Example:

```js
// ❌ Bad
const MyComponent = ({ value }) => {
  return <div>{value}</div>;
};

// ✅ Good
const MyComponent = (props) => {
  // destructuring objects returned by React hooks is fine
  const { property } = useLocaleCurrency();
  return <div>{props.myProp} {property}</div>;
};
```
## Why is relay.config.json at the root?

I couldn't get the VS Code extension to work with the relay.config.json file in the `apps/web` directory. This also means that the relay-compiler is run from the root directory, hence why the `relay` script in `apps/web` is `cd ../.. && relay-compiler`.