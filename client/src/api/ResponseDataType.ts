// Response shapes returned by the server.
// Add one interface per endpoint, then register it in MapResponseDataType.tsx.

export interface TestResponse {
  message: string;
}

/* ---------------------------------- Auth --------------------------------- */

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

/* ---------------------------------- Admin -------------------------------- */

/** A staff account from the admins table (not a customer). */
export interface AdminProfile {
  id: number;
  name: string;
  email: string;
}

export interface AdminLoginResponse {
  token: string;
  admin: AdminProfile;
}

/** A customer row as shown in the admin panel. */
export interface UserListItem extends AuthUser {
  /** ISO date string, or null if the user has never logged in. */
  last_login: string | null;
  created_at: string;
}

/* --------------------------------- Guests -------------------------------- */

export interface Guest {
  id: number;
  name: string;
  phone: string;
  email: string | null;
}

export type GetGuestsResponse = Guest[];
