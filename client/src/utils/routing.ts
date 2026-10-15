import { Routes } from '../constants/routes';
import type { BuildPathArgs, MatchedParams, QueryParams, RouteKey } from '../constants/routes';

function toQueryString(query?: QueryParams): string {
  if (!query) return '';
  const search = new URLSearchParams();
  for (const [name, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) search.append(name, String(value));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

/**
 * Build a URL for a route. Params are type-checked against the route's `:name` placeholders.
 *
 * @example
 * buildPath('guestDetail', { params: { id: 42 } }); // '/guests/42'
 * buildPath('guests', { query: { page: 2 } });      // '/guests?page=2'
 * buildPath('guestDetail');                          // type error: params required
 */
export function buildPath<K extends RouteKey>(key: K, ...[options]: BuildPathArgs<K>): string {
  const params = (options?.params ?? {}) as Record<string, string | number>;
  const path = Routes[key].replace(/:(\w+)/g, (_match, name: string) => {
    if (!(name in params)) throw new Error(`buildPath('${key}'): missing param "${name}"`);
    return encodeURIComponent(String(params[name]));
  });
  return path + toQueryString(options?.query);
}

const patternCache = new Map<RouteKey, { regex: RegExp; names: string[] }>();

function compile(key: RouteKey) {
  let compiled = patternCache.get(key);
  if (!compiled) {
    const names: string[] = [];
    const source = Routes[key]
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/:(\w+)/g, (_match, name: string) => {
        names.push(name);
        return '([^/]+)';
      });
    compiled = { regex: new RegExp(`^${source}/?$`), names };
    patternCache.set(key, compiled);
  }
  return compiled;
}

/** Match a pathname against one route. Returns its decoded params, or null if it doesn't match. */
export function matchPath<K extends RouteKey>(key: K, pathname: string): MatchedParams<K> | null {
  const { regex, names } = compile(key);
  const match = regex.exec(pathname);
  if (!match) return null;
  const params: Record<string, string> = {};
  names.forEach((name, i) => {
    params[name] = decodeURIComponent(match[i + 1]);
  });
  return params as MatchedParams<K>;
}

/** Find the first route key matching a pathname. */
export function findRoute(pathname: string): RouteKey | null {
  return (Object.keys(Routes) as RouteKey[]).find((key) => matchPath(key, pathname)) ?? null;
}
