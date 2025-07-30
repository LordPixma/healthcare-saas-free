function extractBearerToken(request) {
  const authHeader = request.headers.get('Authorization') || '';
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : null;
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
