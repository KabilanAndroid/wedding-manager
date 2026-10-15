import { useEffect, useId, useRef } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { MoveRight, X } from 'lucide-react';
import { usePost } from '../../api/API';
import { useAuth } from '../../context/AuthContext';
import type { AuthMode } from '../../context/AuthModalContext';
import { TextField } from '../common/TextField';

interface AuthModalProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
  onClose: () => void;
}

const Copy = {
  login: {
    eyebrow: 'Welcome back',
    title: 'Log in to your account',
    lede: 'View bookings, payments and live updates.',
    submit: 'Log In',
    switchPrompt: 'New to Kalyana Manager?',
    switchLabel: 'Create account',
  },
  register: {
    eyebrow: 'Plan together',
    title: 'Create a family account',
    lede: 'Invite your family and manage every service together.',
    submit: 'Create Account',
    switchPrompt: 'Already registered?',
    switchLabel: 'Log in',
  },
} as const satisfies Record<AuthMode, Record<string, string>>;

/** Read a required string field from a submitted form. */
function field(form: FormData, name: string): string {
  return String(form.get(name) ?? '').trim();
}

export function AuthModal({ mode, onModeChange, onClose }: AuthModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const auth = useAuth();
  const login = usePost('login');
  const register = usePost('register');
  const request = mode === 'login' ? login : register;
  const copy = Copy[mode];

  // showModal() gives us the top layer, focus trapping and Escape-to-close for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const switchMode = () => {
    login.reset();
    register.reset();
    onModeChange(mode === 'login' ? 'register' : 'login');
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      if (mode === 'login') {
        auth.signIn(await login.mutate({ email: field(form, 'email'), password: String(form.get('password') ?? '') }));
      } else {
        auth.signIn(await register.mutate({
          name: field(form, 'name'),
          email: field(form, 'email'),
          phone: field(form, 'phone'),
          password: String(form.get('password') ?? ''),
        }));
      }
      onClose();
    } catch {
      // usePost already exposes the error; it's rendered below.
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-auto max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-115 overflow-y-auto rounded-3xl bg-ivory p-0 text-ink shadow-2xl backdrop:bg-maroon-900/55 backdrop:backdrop-blur-[6px]"
    >
      <div className="relative px-6 py-8 sm:px-9">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3.5 right-3.5 grid size-8 cursor-pointer place-items-center rounded-full bg-maroon-900/8 text-maroon-900 transition hover:bg-maroon-900/15"
          aria-label="Close"
        >
          <X size={14} strokeWidth={2.5} aria-hidden="true" />
        </button>

        <div className="flex items-center justify-center gap-3">
          <span
            className="grid size-12.5 shrink-0 place-items-center rounded-full border border-gold-300 bg-gold-50 text-lg font-bold text-saffron shadow-[inset_0_0_0_4px_var(--color-ivory)]"
            aria-hidden="true"
          >
            க
          </span>
          <div className="leading-tight">
            <p className="text-xl font-semibold tracking-tight text-maroon-900">Kalyana Manager</p>
            <p className="text-[11px] text-muted">Celebrations, beautifully managed</p>
          </div>
        </div>

        <div className="mt-7 text-center">
          <p className="eyebrow text-marigold-700">{copy.eyebrow}</p>
          <h2 id={titleId} className="mt-2.5 text-2xl font-medium tracking-tight text-maroon-900">
            {copy.title}
          </h2>
          <p className="mt-2 text-[11px] text-muted">{copy.lede}</p>
        </div>

        <form key={mode} className="mt-6 grid gap-4.5" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <TextField label="Name" name="name" prefix="N" placeholder="Your full name" autoComplete="name" required autoFocus />
          )}
          <TextField
            label="Email"
            name="email"
            type="email"
            prefix="@"
            placeholder="you@example.com"
            autoComplete="email"
            required
            autoFocus={mode === 'login'}
          />
          {mode === 'register' && (
            <TextField
              label="Phone"
              name="phone"
              type="tel"
              prefix="P"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              pattern="^\+?[0-9 ]{10,15}$"
              title="10–15 digits, optionally starting with +"
              required
            />
          )}
          <TextField
            label="Password"
            name="password"
            type="password"
            prefix="•"
            placeholder="Enter your password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            minLength={mode === 'register' ? 8 : undefined}
            required
          />

          {request.error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs text-red-700">
              {request.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={request.loading}
            className="mt-1.5 inline-flex h-12.5 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-marigold-600 text-[15px] font-bold text-white shadow-[0_10px_24px_-10px_rgb(217_119_6/0.7)] transition hover:bg-marigold-700 disabled:cursor-wait disabled:opacity-70"
          >
            {request.loading ? 'Please wait…' : copy.submit}
            <MoveRight size={18} aria-hidden="true" />
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-muted">
          {copy.switchPrompt}{' '}
          <button type="button" onClick={switchMode} className="cursor-pointer font-bold text-marigold-700 hover:underline">
            {copy.switchLabel}
          </button>
        </p>
      </div>
    </dialog>
  );
}
