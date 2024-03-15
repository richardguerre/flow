# API for the Linear plugin for Flow

This is a simple API using [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions/quickstart) that handles the OAuth flow for the Linear plugin for Flow.

The OAuth flow cannot be part of the `linear/out/server.js` as the Linear client secret cannot be exposed. This API is deployed independently from the plugin itself on Vercel.

## What does it do?

It handles the OAuth flow for the Linear plugin with the following routes:

- `api/auth` - redirects to Linear's OAuth consent screen.
- `api/auth/callback` - handles the callback from Linear's OAuth consent screen and exchanges the code for an access token. Once it has the access token (+ refresh token + expiry), it calls on the plugin's `api/plugin/linear/auth/callback` endpoint in the user's Flow instance to store the access token (+ refresh token + expiry) in the user's Flow instance.
- `api/auth/refresh` - handles the refresh of the access token. It calls on the plugin's `api/plugin/linear/auth/callback` endpoint in the user's Flow instance to store the new access token (+ refresh token + expiry) in the user's Flow instance.