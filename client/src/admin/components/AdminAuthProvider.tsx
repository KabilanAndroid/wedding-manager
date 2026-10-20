import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { AdminLoginResponse } from '../../api/ResponseDataType';
import { AdminAuthContext } from '../context/AdminAuthContext';

// Separate key from the customer session ('auth'), so both can be logged in at once
const StorageKey = 'adminAuth';

/** Read the saved session; storage can be unavailable (private mode, blocked site data). */
function loadSession(): AdminLoginResponse | null {
  try {
    const raw = localStorage.getItem(StorageKey);
    return raw ? (JSON.parse(raw) as AdminLoginResponse) : null;
  } catch {
    return null;
  }
}

function saveSession(session: AdminLoginResponse | null) {
  try {
    if (session) localStorage.setItem(StorageKey, JSON.stringify(session));
    else localStorage.removeItem(StorageKey);
  } catch {
    // Session just won't survive a reload.
  }
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminLoginResponse | null>(loadSession);

  const signIn = useCallback((response: AdminLoginResponse) => {
    saveSession(response);
    setSession(response);
  }, []);

  const signOut = useCallback(() => {
    saveSession(null);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ admin: session?.admin ?? null, token: session?.token ?? null, signIn, signOut }),
    [session, signIn, signOut],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
