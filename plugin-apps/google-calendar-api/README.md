# API for the Google Calendar plugin for Flow

This is a simple API using [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions/quickstart) that handles the OAuth flow for the Google Calendar plugin for Flow.

The OAuth flow cannot be part of the `google-calendar/out/server.js` as the Google client secret cannot be exposed. This API is deployed independently from the plugin itself on Vercel.

## What does it do?

It handles the OAuth flow for the Google Calendar plugin with the following routes:

- `api/auth` - redirects to Google's OAuth consent screen.
- `api/auth/callback` - handles the callback from Google's OAuth consent screen and exchanges the code for an access token. Once it has the access token (+ refresh token + expiry), it calls on the plugin's `api/plugin/google-calendar/auth/callback` endpoint in the user's Flow instance to store the access token (+ refresh token + expiry) in the user's Flow instance.
- `api/auth/refresh` - handles the refresh of the access token. It calls on the plugin's `api/plugin/google-calendar/auth/callback` endpoint in the user's Flow instance to store the new access token (+ refresh token + expiry) in the user's Flow instance.