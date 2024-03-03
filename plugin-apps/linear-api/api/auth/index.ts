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
    redirect_uri: `${requestUrl.origin}/api/auth/callback`,
    response_type: "code",
    scope: "read,write",
    state,
    prompt: "consent",
  });

  return Response.redirect(`https://linear.app/oauth/authorize?${searchParams.toString()}`);
};
