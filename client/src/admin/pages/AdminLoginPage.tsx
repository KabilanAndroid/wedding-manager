import type { FormEvent } from 'react';
import { MoveRight, ShieldCheck } from 'lucide-react';
import { usePost } from '../../api/API';
import { Link } from '../../components/common/Link';
import { TextField } from '../../components/common/TextField';
import { useAdminAuth } from '../context/AdminAuthContext';

/** Staff login. Admin accounts live in their own table and are created with `npm run create-admin`. */
export function AdminLoginPage() {
  const { signIn } = useAdminAuth();
  const login = usePost('adminLogin');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      signIn(
        await login.mutate({
          email: String(form.get('email') ?? '').trim(),
          password: String(form.get('password') ?? ''),
        }),
      );
    } catch {
      // usePost already exposes the error; it's rendered below.
    }
  };

  return (
    <main className="grid min-h-svh place-items-center bg-maroon-900 px-4 py-10">
      <div className="w-full max-w-105 rounded-3xl bg-ivory px-6 py-8 text-ink shadow-2xl sm:px-9">
        <div className="flex items-center justify-center gap-3">
          <span
            className="grid size-12.5 shrink-0 place-items-center rounded-full border border-gold-300 bg-gold-50 text-lg font-bold text-saffron shadow-[inset_0_0_0_4px_var(--color-ivory)]"
            aria-hidden="true"
          >
            க
          </span>
          <div className="leading-tight">
            <p className="text-xl font-semibold tracking-tight text-maroon-900">Kalyana Manager</p>
            <p className="text-[11px] text-muted">Admin panel</p>
          </div>
        </div>

        <div className="mt-7 text-center">
          <p className="eyebrow inline-flex items-center gap-1.5 text-marigold-700">
            <ShieldCheck size={14} aria-hidden="true" />
            Staff only
          </p>
          <h1 className="mt-2.5 text-2xl font-medium tracking-tight text-maroon-900">Admin log in</h1>
        </div>

        <form className="mt-6 grid gap-4.5" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            prefix="@"
            placeholder="admin@example.com"
            autoComplete="username"
            required
            autoFocus
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            prefix="•"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          {login.error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3.5 py-2.5 text-xs text-red-700">
              {login.error.message}
            </p>
          )}

          <button
            type="submit"
            disabled={login.loading}
            className="mt-1.5 inline-flex h-12.5 cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-maroon-900 text-[15px] font-bold text-gold-300 transition hover:bg-maroon-800 disabled:cursor-wait disabled:opacity-70"
          >
            {login.loading ? 'Please wait…' : 'Log In'}
            <MoveRight size={18} aria-hidden="true" />
          </button>
        </form>

        <p className="mt-6 text-center text-[11px] text-muted">
          Not staff?{' '}
          <Link to="home" className="font-bold text-marigold-700 hover:underline">
            Go to the website
          </Link>
        </p>
      </div>
    </main>
  );
}
