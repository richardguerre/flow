/**
 * This endpoint handles refreshing the access token given a refresh token.
 */
export const config = {
  runtime: "edge",
};

export default async (request: Request) => {
  const requestUrl = new URL(request.url);
  const refreshToken = requestUrl.searchParams.get("refresh_token");

  if (!refreshToken) {
    return new Response("Missing refresh_token in search params", { status: 400 });
  }

  const body = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    client_secret: process.env.CLIENT_SECRET!,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return new Response(`Err: ${tokenData.error} - ${tokenData.error_description}`, {
      status: 400,
    });
  }

  return new Response(JSON.stringify(tokenData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
