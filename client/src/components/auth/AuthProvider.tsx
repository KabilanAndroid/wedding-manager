import { useCallback, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { api } from '../../api/API';
import type { AuthResponse } from '../../api/ResponseDataType';
import { AuthContext } from '../../context/AuthContext';

const StorageKey = 'auth';

/** Read the saved session; storage can be unavailable (private mode, blocked site data). */
function loadSession(): AuthResponse | null {
  try {
    const raw = localStorage.getItem(StorageKey);
    return raw ? (JSON.parse(raw) as AuthResponse) : null;
  } catch {
    return null;
  }
}

function saveSession(session: AuthResponse | null) {
  try {
    if (session) localStorage.setItem(StorageKey, JSON.stringify(session));
    else localStorage.removeItem(StorageKey);
  } catch {
    // Session just won't survive a reload.
  }
}

/** Send the token with every API request. */
function applyToken(token: string | null) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.common.Authorization;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthResponse | null>(() => {
    const saved = loadSession();
    applyToken(saved?.token ?? null);
    return saved;
  });

  const signIn = useCallback((response: AuthResponse) => {
    applyToken(response.token);
    saveSession(response);
    setSession(response);
  }, []);

  const signOut = useCallback(() => {
    applyToken(null);
    saveSession(null);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ user: session?.user ?? null, token: session?.token ?? null, signIn, signOut }),
    [session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
