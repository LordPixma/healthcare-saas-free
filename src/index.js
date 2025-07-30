module.exports = {
  async fetch(request) {
    return new Response('Hello from Healthcare SaaS Free!', {
      headers: { 'Content-Type': 'text/plain' }
    });
  }
};
