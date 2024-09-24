# API for the Slack plugin for Flow

This is a simple API using [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions/quickstart) that handles the OAuth flow for the Slack plugin for Flow.

The OAuth flow cannot be part of the `slack/out/server.js` as the Slack client secret cannot be exposed. This API is deployed independently from the plugin itself on Vercel.

## What does it do?

It handles the OAuth flow for the Slack plugin with the following routes:

- `api/auth` - redirects to Slack's OAuth consent screen.
- `api/auth/callback` - handles the callback from Slack's OAuth consent screen and exchanges the code for an access token. Once it has the access token (+ refresh token + expiry), it calls on the plugin's `api/plugin/slack/auth/callback` endpoint in the user's Flow instance to store the access token (+ refresh token + expiry) in the user's Flow instance.
- `api/auth/refresh` - doesn't exits as Slack tokens don't expire.