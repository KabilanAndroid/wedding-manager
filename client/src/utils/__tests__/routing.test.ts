/// <reference types="jest" />

import { buildPath, findRoute, matchPath } from '../routing';

describe('buildPath', () => {
  it('builds routes without params', () => {
    expect(buildPath('home')).toBe('/');
    expect(buildPath('guests', { query: { page: 2, search: 'ann', empty: undefined } })).toBe(
      '/guests?page=2&search=ann',
    );
  });

  it('fills and encodes params', () => {
    expect(buildPath('guestDetail', { params: { id: 42 } })).toBe('/guests/42');
    expect(buildPath('functionDetail', { params: { eventId: 'a b', functionId: 7 } })).toBe(
      '/events/a%20b/functions/7',
    );
  });

  it('rejects wrong params at compile time', () => {
    // @ts-expect-error params are required for guestDetail
    expect(() => buildPath('guestDetail')).toThrow('missing param "id"');
    // @ts-expect-error unknown param name
    expect(() => buildPath('guestDetail', { params: { guestId: 1 } })).toThrow();
    // @ts-expect-error missing functionId
    expect(() => buildPath('functionDetail', { params: { eventId: 1 } })).toThrow();
    // @ts-expect-error guests takes no params
    buildPath('guests', { params: { id: 1 } });
    // @ts-expect-error unknown route key
    expect(() => buildPath('nope')).toThrow();
  });
});

describe('matchPath / findRoute', () => {
  it('matches and decodes params', () => {
    const params = matchPath('functionDetail', '/events/a%20b/functions/7');
    expect(params).toEqual({ eventId: 'a b', functionId: '7' });
    // Typed as { eventId: string; functionId: string } | null
    const eventId: string | undefined = params?.eventId;
    expect(eventId).toBe('a b');
  });

  it('returns null on mismatch and tolerates a trailing slash', () => {
    expect(matchPath('guestDetail', '/guests')).toBeNull();
    expect(matchPath('guestDetail', '/guests/5/')).toEqual({ id: '5' });
  });

  it('finds the matching route key', () => {
    expect(findRoute('/')).toBe('home');
    expect(findRoute('/guests/5')).toBe('guestDetail');
    expect(findRoute('/events/1/functions/2')).toBe('functionDetail');
    expect(findRoute('/unknown')).toBeNull();
  });
});
