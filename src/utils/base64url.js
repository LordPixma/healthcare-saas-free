export function decodeBase64Url(input) {
  if (typeof input !== 'string') {
    throw new TypeError('Expected a string');
  }
  let normalized = input.replace(/-/g, '+').replace(/_/g, '/');
  while (normalized.length % 4 !== 0) {
    normalized += '=';
  }
  return Buffer.from(normalized, 'base64');
}
