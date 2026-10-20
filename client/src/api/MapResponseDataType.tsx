// Maps each endpoint key to its request and response types.
// The key used here must match the key in ApiEndpoints (ApiTypes.tsx);
// useGet / usePost read these maps to infer types from the key alone.

import type {
  AdminLoginRequest,
  CreateGuestRequest,
  GetGuestsParams,
  LoginRequest,
  RegisterRequest,
} from './RequestDataType';
import type {
  AdminLoginResponse,
  AuthResponse,
  GetGuestsResponse,
  Guest,
  TestResponse,
  UserListItem,
} from './ResponseDataType';

/** GET endpoints: query params + response. */
export interface GetApiMap {
  test: { params: void; response: TestResponse };
  getGuests: { params: GetGuestsParams; response: GetGuestsResponse };
  getAdminUsers: { params: void; response: UserListItem[] };
}

/** POST endpoints: request body + response. */
export interface PostApiMap {
  login: { request: LoginRequest; response: AuthResponse };
  register: { request: RegisterRequest; response: AuthResponse };
  createGuest: { request: CreateGuestRequest; response: Guest };
  adminLogin: { request: AdminLoginRequest; response: AdminLoginResponse };
}

export type GetApiKey = keyof GetApiMap;
export type PostApiKey = keyof PostApiMap;

export type GetParams<K extends GetApiKey> = GetApiMap[K]['params'];
export type GetResponse<K extends GetApiKey> = GetApiMap[K]['response'];
export type PostRequest<K extends PostApiKey> = PostApiMap[K]['request'];
export type PostResponse<K extends PostApiKey> = PostApiMap[K]['response'];
