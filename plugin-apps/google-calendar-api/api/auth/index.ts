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
      { status: 400 }
    );
  }
  const searchParams = new URLSearchParams({
    access_type: "offline",
    response_type: "code",
    client_id: process.env.CLIENT_ID!,
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ].join(" "),
    redirect_uri: `${requestUrl.origin}/api/auth/callback`,
    prompt: "select_account",
    state,
  });

  return Response.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${searchParams.toString()}`
  );
};
