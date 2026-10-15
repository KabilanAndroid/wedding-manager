// Response shapes returned by the server.
// Add one interface per endpoint, then register it in MapResponseDataType.tsx.

export interface TestResponse {
  message: string;
}

/* ---------------------------------- Auth --------------------------------- */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/* --------------------------------- Guests -------------------------------- */

export interface Guest {
  id: number;
  name: string;
  phone: string;
  email: string | null;
}

export type GetGuestsResponse = Guest[];
