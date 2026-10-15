// Request body / query param shapes sent to the server.
// Add one interface per endpoint, then register it in MapResponseDataType.tsx.

/* ---------------------------------- Auth --------------------------------- */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

/* --------------------------------- Guests -------------------------------- */

export interface GetGuestsParams {
  page?: number;
  search?: string;
}

export interface CreateGuestRequest {
  name: string;
  phone: string;
  email?: string;
}
