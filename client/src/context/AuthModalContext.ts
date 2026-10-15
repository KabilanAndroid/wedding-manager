import { createContext, useContext } from 'react';

export type AuthMode = 'login' | 'register';

export interface AuthModalContextValue {
  /** Open the modal on the given form. */
  open: (mode: AuthMode) => void;
  close: () => void;
}

export const AuthModalContext = createContext<AuthModalContextValue | null>(null);

/**
 * @example
 * const authModal = useAuthModal();
 * <button onClick={() => authModal.open('login')}>Sign in</button>
 */
export function useAuthModal(): AuthModalContextValue {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error('useAuthModal must be used inside <AuthModalProvider>');
  return ctx;
}
