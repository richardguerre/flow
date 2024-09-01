/**
 * This endpoint handles the callback from Linear's OAuth consent screen and exchanges the code for an access token.
 *
 * Once the access token is retrieved, it is stored in the user's Flow instance using the API endpoint provided in the state parameter,
 * and the user is redirected to the Flow instance (the origin part of the API endpoint)
 */
export const config = {
  runtime: "edge",
};

export default async (request: Request) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const apiEndpoint = requestUrl.searchParams.get("state"); // the state contains the API endpoint to store the tokenData in the user's Flow instance. See api/auth/index.ts for more details.

  if (!code) {
    return new Response("Missing code in search params", { status: 400 });
  } else if (!apiEndpoint) {
    return new Response(
      "Missing state (i.e the API endpoint to store the tokens) in search params",
      { status: 400 },
    );
  }

  const body = new URLSearchParams({
    code,
    redirect_uri: `${process.env.REDIRECT_URL_ORIGIN ?? requestUrl.origin}/api/auth/callback`,
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    grant_type: "authorization_code",
  });

  const tokenResponse = await fetch("https://slack.com/api/oauth.v2.access", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await tokenResponse.json();

  if (data.error) {
    return new Response(`Err: ${data.error}`, { status: 400 });
  }
  if (!data.access_token) {
    return new Response("Failed to get access token", { status: 500 });
  }

  const storeTokenResponse = await fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!storeTokenResponse.ok) {
    return new Response("Failed to store token data", { status: 500 });
  }

  const flowInstanceOrigin = new URL(apiEndpoint).origin;

  return Response.redirect(`${flowInstanceOrigin}/settings/plugin/linear`);
};
