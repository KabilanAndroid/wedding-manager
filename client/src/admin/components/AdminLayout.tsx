import type { ReactNode } from 'react';
import { ExternalLink, LogOut } from 'lucide-react';
import { Link } from '../../components/common/Link';
import { useAdminAuth } from '../context/AdminAuthContext';

const navLink =
  'inline-flex items-center rounded-md px-3 py-2 text-xs font-semibold text-white/85 hover:bg-white/8 aria-[current=page]:bg-white/10 aria-[current=page]:text-white';

/** Shell for every signed-in admin page: admin top bar instead of the customer header. */
export function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, signOut } = useAdminAuth();

  return (
    <div className="min-h-svh bg-cream">
      <header className="sticky top-0 z-30 bg-maroon-900 text-white">
        <div className="container-page flex min-h-15 flex-wrap items-center gap-x-6 gap-y-2 py-2.5">
          <Link to="adminUsers" className="flex shrink-0 items-center gap-2.5">
            <span
              className="grid size-9 place-items-center rounded-full border-2 border-gold-300 bg-gold-50 text-base font-bold text-saffron"
              aria-hidden="true"
            >
              க
            </span>
            <span className="text-sm font-bold tracking-tight">
              Kalyana Manager <span className="font-medium text-gold-300">Admin</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1" aria-label="Admin">
            <Link to="adminUsers" className={navLink} aria-current="page">
              Users
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <Link to="home" className="hidden items-center gap-1.5 text-[11px] text-white/70 hover:text-white sm:inline-flex">
              View site
              <ExternalLink size={12} aria-hidden="true" />
            </Link>
            <span className="max-w-40 truncate text-[11px] text-white/85">{admin?.name}</span>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-white/20 px-2.5 py-1.5 text-[11px] font-bold hover:border-gold-300 hover:text-gold-300"
            >
              <LogOut size={13} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
