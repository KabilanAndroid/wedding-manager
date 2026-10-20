import type { AxiosRequestConfig } from 'axios';
import type { GetApiKey, PostApiKey } from './MapResponseDataType';

/**
 * Endpoint URLs, relative to VITE_API_URL.
 * Use `:name` for path params, e.g. '/guests/:id', filled via `pathParams`.
 */
export const ApiEndpoints: Record<GetApiKey | PostApiKey, string> = {
  test: '/test',
  getGuests: '/guests',
  createGuest: '/guests',
  login: '/auth/login',
  register: '/auth/register',
  adminLogin: '/admin/auth/login',
  getAdminUsers: '/admin/users',
};

export type PathParams = Record<string, string | number>;

/** Normalized error shape returned by every hook. */
export interface ApiError {
  message: string;
  /** HTTP status code, or null for network / client-side errors. */
  status: number | null;
  /** Raw response body sent by the server, if any. */
  data: unknown;
}

/* ---------------------------------- GET ---------------------------------- */

export interface UseGetOptions<TParams> {
  /** Query string params. */
  params?: TParams;
  /** Values for `:name` placeholders in the endpoint URL. */
  pathParams?: PathParams;
  /** Set false to skip the automatic fetch (e.g. until an id is known). Default: true. */
  enabled?: boolean;
  /** Extra axios config (headers, timeout, ...). */
  config?: AxiosRequestConfig;
}

export interface UseGetResult<TResponse> {
  data: TResponse | null;
  error: ApiError | null;
  loading: boolean;
  /** Re-run the request manually. Resolves with the response data. */
  refetch: () => Promise<TResponse | undefined>;
}

/* ---------------------------------- POST --------------------------------- */

export interface PostCallOptions {
  /** Values for `:name` placeholders in the endpoint URL. */
  pathParams?: PathParams;
  config?: AxiosRequestConfig;
}

export interface UsePostResult<TRequest, TResponse> {
  data: TResponse | null;
  error: ApiError | null;
  loading: boolean;
  /** Send the request. Resolves with the response data, rejects with ApiError. */
  mutate: (body: TRequest, options?: PostCallOptions) => Promise<TResponse>;
  /** Clear data / error back to the initial state. */
  reset: () => void;
}
