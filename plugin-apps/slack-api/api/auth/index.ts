/**
 * This endpoint redirects to Google's OAuth consent screen.
 */
export const config = {
  runtime: "edge",
};

export default (request: Request) => {
  const requestUrl = new URL(request.url);
  const state = requestUrl.searchParams.get("api_endpoint"); // This is the API endpoint that will be used to store the tokenData in the user's Flow instance. See api/auth/callback.ts for more details.
  if (!state) {
    return new Response(
      "Missing api_endpoint in search params to know which API to hit once the access token is retrieved.",
      { status: 400 },
    );
  }
  const searchParams = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    redirect_uri: `${process.env.REDIRECT_URL_ORIGIN ?? requestUrl.origin}/api/auth/callback`,
    user_scope: "chat:write,channels:read,groups:read,im:read,mpim:read",
    state,
  });

  return Response.redirect(`https://slack.com/oauth/v2/authorize?${searchParams.toString()}`);
};
