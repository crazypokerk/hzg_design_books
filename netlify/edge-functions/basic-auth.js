const REALM = "HZG Design Books";
const USERS_ENV = "BASIC_AUTH_USERS";

function getEnv(name) {
  if (typeof Netlify !== "undefined" && Netlify.env) {
    return Netlify.env.get(name);
  }

  return undefined;
}

function parseAllowedUsers(raw) {
  return (raw || "")
    .split(/[\s,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function decodeCredentials(header) {
  if (!header || !header.toLowerCase().startsWith("basic ")) {
    return "";
  }

  try {
    const token = header.slice(6).trim();
    const bytes = Uint8Array.from(atob(token), (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}

function safeEqual(left, right) {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let mismatch = leftBytes.length === rightBytes.length ? 0 : 1;

  for (let index = 0; index < length; index += 1) {
    mismatch |= (leftBytes[index] || 0) ^ (rightBytes[index] || 0);
  }

  return mismatch === 0;
}

function hasAccess(credentials, allowedUsers) {
  return allowedUsers.some((user) => safeEqual(credentials, user));
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "cache-control": "no-store",
      "www-authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function misconfigured() {
  return new Response(
    `Basic authentication is not configured. Set ${USERS_ENV} in Netlify environment variables.`,
    {
      status: 500,
      headers: {
        "cache-control": "no-store",
        "content-type": "text/plain; charset=utf-8",
      },
    },
  );
}

export default async function basicAuth(request, context) {
  const allowedUsers = parseAllowedUsers(getEnv(USERS_ENV));

  if (allowedUsers.length === 0) {
    return misconfigured();
  }

  const credentials = decodeCredentials(request.headers.get("authorization"));

  if (credentials && hasAccess(credentials, allowedUsers)) {
    return context.next();
  }

  return unauthorized();
}
