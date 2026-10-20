import { useState } from 'react';
import type { ReactNode } from 'react';
import { ExternalLink, LayoutDashboard, LayoutGrid, LogOut, Menu, Users, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Link } from '../../components/common/Link';
import type { RouteKey } from '../../constants/routes';
import { useNavigation } from '../../hooks/useNavigation';
import { useAdminAuth } from '../context/AdminAuthContext';

/** Sidebar items. Each route also needs a page in AdminApp's AdminPages. */
const NavItems: { to: Extract<RouteKey, 'adminDashboard' | 'adminUsers' | 'adminCategories' | 'adminEventspage' | 'adminOrderHistory'
  |'adminSubCategories'| 'adminFoodAndCatering'|'adminPackageAndPricing'
  |'adminPayments'|'adminCouponsAndOffers'|'adminReviewsAndRatings'
  |'adminNotification'|'adminSettings'>;
  
  label: string; icon: LucideIcon }[] = [
  { to: 'adminDashboard', label: 'Dashboard', icon: LayoutDashboard },
  {to: 'adminEventspage', label: 'Events', icon: LayoutDashboard},
  { to:'adminOrderHistory', label: 'Orders', icon: LayoutDashboard },
  { to: 'adminUsers', label: 'Users', icon: Users },
  { to: 'adminCategories', label: 'Categories', icon: LayoutGrid },
  { to: 'adminSubCategories', label: 'Sub Categories', icon: LayoutGrid },
  { to: 'adminFoodAndCatering', label: 'Food And Catering', icon: LayoutGrid },
  { to: 'adminPackageAndPricing', label: 'Package And Pricing', icon: LayoutGrid },
  { to: 'adminPayments', label: 'Payments', icon: LayoutGrid },
  { to: 'adminCouponsAndOffers', label: 'Coupons And Offers', icon: LayoutGrid },
  { to: 'adminReviewsAndRatings', label: 'Reviews And Ratings', icon: LayoutGrid },
  { to: 'adminNotification', label: 'Notification', icon: LayoutGrid },
  { to: 'adminSettings', label: 'Settings', icon: LayoutGrid },
  
];

const navLink =
  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold text-white/75 transition hover:bg-white/8 hover:text-white aria-[current=page]:bg-white/12 aria-[current=page]:text-gold-300';

/** Shell for every signed-in admin page: sidebar navigation plus a slim top bar. */
export function AdminLayout({ children }: { children: ReactNode }) {
  const { admin, signOut } = useAdminAuth();
  const { isActive } = useNavigation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-svh bg-cream lg:flex">
      {/* Mobile backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={closeMenu} aria-hidden="true" />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-maroon-900 text-white transition-transform lg:sticky lg:top-0 lg:h-svh lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex min-h-15 items-center justify-between gap-2 border-b border-white/10 px-4">
          <Link to="adminDashboard" onClick={closeMenu} className="flex items-center gap-2.5">
            <span
              className="grid size-9 place-items-center rounded-full border-2 border-gold-300 bg-gold-50 text-base font-bold text-saffron"
              aria-hidden="true"
            >
              க
            </span>
            <span className="text-sm leading-tight font-bold tracking-tight">
              Kalyana Manager <span className="block font-medium text-gold-300">Admin</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            className="cursor-pointer rounded-md p-1.5 text-white/75 hover:bg-white/8 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3" aria-label="Admin">
          {NavItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={navLink}
              aria-current={isActive(to) ? 'page' : undefined}
            >
              <Icon size={17} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <Link to="home" className="flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-white/70 hover:text-white">
            <ExternalLink size={14} aria-hidden="true" />
            View site
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
          <div className="container-page flex min-h-15 items-center gap-4 py-2.5">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer rounded-md p-1.5 text-maroon-900 hover:bg-gold-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={20} aria-hidden="true" />
            </button>

            <div className="ml-auto flex items-center gap-4">
              <span className="max-w-40 truncate text-xs font-semibold text-maroon-900">{admin?.name}</span>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[11px] font-bold text-maroon-900 hover:border-gold-400 hover:bg-gold-50"
              >
                <LogOut size={13} aria-hidden="true" />
                Sign out
              </button>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
