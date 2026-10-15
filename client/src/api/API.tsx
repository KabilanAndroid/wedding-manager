import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ApiEndpoints } from './ApiTypes';
import type { ApiError, PathParams, UseGetOptions, UseGetResult, UsePostResult } from './ApiTypes';
import type {
  GetApiKey,
  GetParams,
  GetResponse,
  PostApiKey,
  PostRequest,
  PostResponse,
} from './MapResponseDataType';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

/** Convert any axios / network error into a consistent ApiError. */
export function toApiError(err: unknown): ApiError {
  if (axios.isAxiosError(err)) {
    const body = err.response?.data;
    return {
      message: body?.message || err.message || 'Request failed',
      status: err.response?.status ?? null,
      data: body ?? null,
    };
  }
  return {
    message: err instanceof Error ? err.message : 'Unknown error',
    status: null,
    data: null,
  };
}

/** Replace `:name` placeholders in an endpoint with values from pathParams. */
function buildUrl(path: string, pathParams?: PathParams): string {
  if (!pathParams) return path;
  return path.replace(/:(\w+)/g, (match, name: string) =>
    name in pathParams ? encodeURIComponent(String(pathParams[name])) : match,
  );
}

/**
 * GET request. Runs on mount and whenever the URL or params change.
 *
 * @example
 * const { data, loading, error, refetch } = useGet('getGuests', { params: { page: 1 } });
 * // data is typed as GetGuestsResponse | null
 */
export function useGet<K extends GetApiKey>(
  key: K,
  options: UseGetOptions<GetParams<K>> = {},
): UseGetResult<GetResponse<K>> {
  const { params, pathParams, enabled = true, config } = options;

  const url = buildUrl(ApiEndpoints[key], pathParams);
  // Inline `params` objects change identity every render, so key on their content.
  const paramsKey = JSON.stringify(params ?? {});
  const requestKey = `${url}?${paramsKey}`;

  const [data, setData] = useState<GetResponse<K> | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  // Key of the last request that finished; while it differs from requestKey we're loading.
  const [fetchedKey, setFetchedKey] = useState<string | null>(null);
  const [refetching, setRefetching] = useState(false);

  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  });

  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (): Promise<GetResponse<K> | undefined> => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const res = await api.get<GetResponse<K>>(url, {
        ...configRef.current,
        params: JSON.parse(paramsKey),
        signal: controller.signal,
      });
      setData(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      if (axios.isCancel(err)) return undefined;
      setError(toApiError(err));
      return undefined;
    } finally {
      if (controllerRef.current === controller) {
        setFetchedKey(`${url}?${paramsKey}`);
        setRefetching(false);
      }
    }
  }, [url, paramsKey]);

  useEffect(() => {
    if (!enabled) return undefined;
    fetchData();
    return () => controllerRef.current?.abort();
  }, [enabled, fetchData]);

  const refetch = useCallback(() => {
    setRefetching(true);
    return fetchData();
  }, [fetchData]);

  const loading = refetching || (enabled && fetchedKey !== requestKey);

  return { data, error, loading, refetch };
}

/**
 * POST request. Nothing is sent until you call `mutate`.
 *
 * @example
 * const { mutate, loading, error } = usePost('createGuest');
 * const guest = await mutate({ name: 'Ravi', phone: '9876543210' });
 * // body is checked against CreateGuestRequest, guest is typed as Guest
 */
export function usePost<K extends PostApiKey>(
  key: K,
): UsePostResult<PostRequest<K>, PostResponse<K>> {
  const [data, setData] = useState<PostResponse<K> | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const mutate = useCallback<UsePostResult<PostRequest<K>, PostResponse<K>>['mutate']>(
    async (body, options = {}) => {
      setLoading(true);
      setError(null);
      try {
        const url = buildUrl(ApiEndpoints[key], options.pathParams);
        const res = await api.post<PostResponse<K>>(url, body, options.config);
        setData(res.data);
        return res.data;
      } catch (err) {
        const apiError = toApiError(err);
        setError(apiError);
        throw apiError;
      } finally {
        setLoading(false);
      }
    },
    [key],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, error, loading, mutate, reset };
}
