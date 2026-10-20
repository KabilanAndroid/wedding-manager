import { createContext, useContext } from 'react';
import type { AdminLoginResponse, AdminProfile } from '../../api/ResponseDataType';

export interface AdminAuthContextValue {
  /** The logged-in admin, or null when signed out. */
  admin: AdminProfile | null;
  token: string | null;
  /** Store the session returned by the admin login endpoint. */
  signIn: (response: AdminLoginResponse) => void;
  signOut: () => void;
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

/**
 * Admin session — kept separate from the customer session in useAuth().
 *
 * @example
 * const { admin, signOut } = useAdminAuth();
 */
export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>');
  return ctx;
}
