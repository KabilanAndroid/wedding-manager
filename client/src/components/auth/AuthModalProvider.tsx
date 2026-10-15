import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { AuthModalContext } from '../../context/AuthModalContext';
import type { AuthMode } from '../../context/AuthModalContext';
import { AuthModal } from './AuthModal';

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AuthMode | null>(null);

  const value = useMemo(() => ({ open: setMode, close: () => setMode(null) }), []);

  return (
    <AuthModalContext.Provider value={value}>
      {children}
      {mode && <AuthModal mode={mode} onModeChange={setMode} onClose={value.close} />}
    </AuthModalContext.Provider>
  );
}
