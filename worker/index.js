function extractBearerToken(request) {
  const authHeader = request.headers.get('Authorization') || '';
  // Match "Bearer" followed by one or more spaces and then capture the rest, allowing for extra whitespace
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const token = match[1].trim();
  // Ensure token is non-empty and not just whitespace
  if (!token) return null;
  return token;
}

export default {
  async fetch(request, env) {
    const token = extractBearerToken(request);
    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }
    return new Response('Healthcare SaaS API');
  },
};
