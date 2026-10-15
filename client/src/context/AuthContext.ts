import { createContext, useContext } from 'react';
import type { AuthResponse, AuthUser } from '../api/ResponseDataType';

export interface AuthContextValue {
  /** The logged-in user, or null when signed out. */
  user: AuthUser | null;
  token: string | null;
  /** Store the session returned by the login / register endpoints. */
  signIn: (response: AuthResponse) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * @example
 * const { user, signOut } = useAuth();
 * {user ? <span>Hello, {user.name}</span> : null}
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
