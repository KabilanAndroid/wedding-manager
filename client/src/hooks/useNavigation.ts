import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { BuildPathArgs, BuildPathOptions, MatchedParams, RouteKey } from '../constants/routes';
import { buildPath, findRoute, matchPath } from '../utils/routing';

/** pushState / replaceState don't fire popstate, so we dispatch our own event. */
const NAVIGATE_EVENT = 'app:navigate';

function subscribe(onChange: () => void): () => void {
  window.addEventListener('popstate', onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

// Return a primitive so useSyncExternalStore sees a stable snapshot.
const getSnapshot = () => window.location.pathname + window.location.search;
const getServerSnapshot = () => '/';

export type NavigateOptions<K extends RouteKey> = BuildPathOptions<K> & {
  /** Replace the current history entry instead of pushing a new one. */
  replace?: boolean;
  /** Arbitrary data stored on the history entry. */
  state?: unknown;
};

/** Options are required only when the route has params. */
export type NavigateArgs<K extends RouteKey> =
  BuildPathArgs<K> extends [options: unknown] ? [options: NavigateOptions<K>] : [options?: NavigateOptions<K>];

/**
 * Typed navigation over the browser History API.
 *
 * @example
 * const { navigate, route, isActive } = useNavigation();
 * navigate('guests');
 * navigate('guestDetail', { params: { id: guest.id } });
 * navigate('guests', { query: { page: 2 }, replace: true });
 * navigate('guestDetail');                     // type error: params required
 * navigate('guestDetail', { params: { x: 1 } }); // type error: unknown param
 */
export function useNavigation() {
  const href = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const { pathname, query } = useMemo(() => {
    const url = new URL(href, 'http://localhost');
    return { pathname: url.pathname, query: url.searchParams };
  }, [href]);

  const route = useMemo(() => findRoute(pathname), [pathname]);

  const navigate = useCallback(<K extends RouteKey>(key: K, ...args: NavigateArgs<K>) => {
    const options = args[0] as NavigateOptions<K> | undefined;
    const url = buildPath(key, ...([options] as BuildPathArgs<K>));
    if (url === getSnapshot() && !options?.replace) return;

    if (options?.replace) window.history.replaceState(options.state ?? null, '', url);
    else window.history.pushState(options?.state ?? null, '', url);
    window.dispatchEvent(new Event(NAVIGATE_EVENT));
  }, []);

  const back = useCallback(() => window.history.back(), []);
  const forward = useCallback(() => window.history.forward(), []);

  /** True when the current URL matches the given route. */
  const isActive = useCallback((key: RouteKey) => matchPath(key, pathname) !== null, [pathname]);

  return { pathname, query, route, navigate, back, forward, isActive, buildPath };
}

/**
 * Read typed params for a route from the current URL. Returns null if the URL doesn't match.
 *
 * @example
 * const params = useRouteParams('guestDetail'); // { id: string } | null
 */
export function useRouteParams<K extends RouteKey>(key: K): MatchedParams<K> | null {
  const { pathname } = useNavigation();
  return useMemo(() => matchPath(key, pathname), [key, pathname]);
}
