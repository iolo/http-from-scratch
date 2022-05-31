const { parseUrl, parseQueryString } = require('./url');

describe('url', () => {
  describe('parseQueryString', () => {
    it('should parse', () => {
      expect(parseQueryString('a=b&c=d')).toEqual({ a: 'b', c: 'd' });
      expect(parseQueryString('a&c')).toEqual({ a: '', c: '' });
      expect(parseQueryString('a')).toEqual({ a: '' });
    });
  });
  describe('parseUrl', () => {
    it('should parse', () => {
      expect(parseUrl('https://user:pass@example.com:123/p/a/t/h?a=b&c=d#e=f&g=h')).toEqual({
        protocol: 'https:',
        origin: 'https://example.com:123',
        username: 'user',
        password: 'pass',
        host: 'example.com:123',
        hostname: 'example.com',
        port: '123',
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: '#e=f&g=h',
      });
      expect(parseUrl('https://example.com:123/p/a/t/h?a=b&c=d#e=f&g=h')).toEqual({
        protocol: 'https:',
        origin: 'https://example.com:123',
        username: undefined,
        password: undefined,
        host: 'example.com:123',
        hostname: 'example.com',
        port: '123',
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: '#e=f&g=h',
      });
      expect(parseUrl('https://user:pass@example.com/p/a/t/h?a=b&c=d#e=f&g=h')).toEqual({
        protocol: 'https:',
        origin: 'https://example.com',
        username: 'user',
        password: 'pass',
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: '#e=f&g=h',
      });
      expect(parseUrl('https://example.com/p/a/t/h?a=b&c=d#e=f&g=h')).toEqual({
        protocol: 'https:',
        origin: 'https://example.com',
        username: undefined,
        password: undefined,
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: '#e=f&g=h',
      });
      expect(parseUrl('//user:pass@example.com/p/a/t/h?a=b&c=d#e=f&g=h')).toEqual({
        protocol: undefined,
        origin: undefined,
        username: 'user',
        password: 'pass',
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: '#e=f&g=h',
      });
      expect(parseUrl('//example.com/p/a/t/h?a=b&c=d#e=f&g=h')).toEqual({
        protocol: undefined,
        origin: undefined,
        username: undefined,
        password: undefined,
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: '#e=f&g=h',
      });
      expect(parseUrl('//user:pass@example.com/p/a/t/h?a=b&c=d')).toEqual({
        protocol: undefined,
        origin: undefined,
        username: 'user',
        password: 'pass',
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: undefined,
      });
      expect(parseUrl('//example.com/p/a/t/h?a=b&c=d')).toEqual({
        protocol: undefined,
        origin: undefined,
        username: undefined,
        password: undefined,
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: undefined,
      });
      expect(parseUrl('//user:pass@example.com/p/a/t/h')).toEqual({
        protocol: undefined,
        origin: undefined,
        username: 'user',
        password: 'pass',
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: undefined,
        searchParams: undefined,
        hash: undefined,
      });
      expect(parseUrl('//example.com/p/a/t/h')).toEqual({
        protocol: undefined,
        origin: undefined,
        username: undefined,
        password: undefined,
        host: 'example.com',
        hostname: 'example.com',
        port: undefined,
        path: '/p/a/t/h',
        search: undefined,
        searchParams: undefined,
        hash: undefined,
      });
      expect(parseUrl('/p/a/t/h?a=b&c=d#e=f&g=h')).toEqual({
        protocol: undefined,
        origin: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: '#e=f&g=h',
      });
      expect(parseUrl('/p/a/t/h?a=b&c=d')).toEqual({
        protocol: undefined,
        origin: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        path: '/p/a/t/h',
        search: '?a=b&c=d',
        searchParams: { a: 'b', c: 'd' },
        hash: undefined,
      });
      expect(parseUrl('/p/a/t/h#e=f&g=h')).toEqual({
        protocol: undefined,
        origin: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        path: '/p/a/t/h',
        search: undefined,
        searchParams: undefined,
        hash: '#e=f&g=h',
      });
      expect(parseUrl('/p/a/t/h')).toEqual({
        protocol: undefined,
        origin: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        path: '/p/a/t/h',
        search: undefined,
        searchParams: undefined,
        hash: undefined,
      });
      expect(parseUrl('/')).toEqual({
        protocol: undefined,
        origin: undefined,
        host: undefined,
        hostname: undefined,
        port: undefined,
        path: '/',
        search: undefined,
        searchParams: undefined,
        hash: undefined,
      });
    });
  });
});
