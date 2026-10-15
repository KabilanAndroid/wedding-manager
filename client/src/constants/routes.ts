/**
 * App routes. Use `:name` for path params, e.g. '/guests/:id'.
 * Keep `as const` — the param names are read from these literals at the type level.
 */
export const Routes = {
  home: '/',
  guests: '/guests',
  guestDetail: '/guests/:id',
  events: '/events',
  eventDetail: '/events/:eventId',
  functionDetail: '/events/:eventId/functions/:functionId',
} as const;

export type RouteKey = keyof typeof Routes;
export type RoutePath<K extends RouteKey> = (typeof Routes)[K];

/** '/events/:eventId/functions/:functionId' -> 'eventId' | 'functionId' */
type ExtractParamNames<P extends string> = P extends `${string}:${infer Param}/${infer Rest}`
  ? Param | ExtractParamNames<`/${Rest}`>
  : P extends `${string}:${infer Param}`
    ? Param
    : never;

export type RouteParamNames<K extends RouteKey> = ExtractParamNames<RoutePath<K>>;

/** True when the route has at least one `:param`. */
export type HasParams<K extends RouteKey> = [RouteParamNames<K>] extends [never] ? false : true;

/** Params required to build a route's URL. */
export type RouteParams<K extends RouteKey> = { [P in RouteParamNames<K>]: string | number };

/** Params read back from the URL (always strings). */
export type MatchedParams<K extends RouteKey> = { [P in RouteParamNames<K>]: string };

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export type BuildPathOptions<K extends RouteKey> = {
  query?: QueryParams;
} & (HasParams<K> extends true ? { params: RouteParams<K> } : { params?: never });

/** Options are required only when the route has params. */
export type BuildPathArgs<K extends RouteKey> =
  HasParams<K> extends true ? [options: BuildPathOptions<K>] : [options?: BuildPathOptions<K>];
