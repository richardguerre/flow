> Just a place to write down some thoughts

# Keyboard shortcuts

- Looked at using [react-shortcuts](https://www.npmjs.com/package/react-shortcuts) but it's written in JS and doesn't have TypeScript types (no @types/react-shortcuts).
- Looked into react-hotkeys and react-hotkeys-hook, which are better, but still not what I want.
- I could use react-hotkeys-hook and use the `useHotkeys` hook globally, and have a separate react context that keeps track of which element is in focus, then combining the 2.