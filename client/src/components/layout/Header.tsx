import { useState } from 'react';
import type { FormEvent } from 'react';
import { ChevronDown, Menu, Search } from 'lucide-react';
import { ServiceCategories } from '../../constants/services';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { useCart } from '../../context/CartContext';
import type { ServiceCategoryKey } from '../../constants/services';
import { useNavigation } from '../../hooks/useNavigation';
import { matchPath } from '../../utils/routing';
import { Link } from '../common/Link';
import { AllMenu } from './AllMenu';

const navLink =
  'inline-flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-2.5 text-[11px] font-semibold hover:bg-white/8 aria-[current=page]:bg-white/8';
const actionLabel = 'text-[11px] font-bold group-hover:text-gold-300';

export function Header() {
  const { count: cartCount } = useCart();
  const { navigate, pathname, query } = useNavigation();
  const authModal = useAuthModal();
  const { user, signOut } = useAuth();
  const activeCategory = matchPath('serviceCategory', pathname)?.category;
  const [category, setCategory] = useState<ServiceCategoryKey | 'all'>('all');
  const [search, setSearch] = useState(query.get('q') ?? '');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('search', {
      query: { q: search.trim() || undefined, category: category === 'all' ? undefined : category },
    });
  };

  return (
    <header className="sticky top-0 z-30 text-white">
      <div className="bg-maroon-900">
        <div className="container-page flex min-h-17 flex-wrap items-center gap-x-6 gap-y-3 py-3 lg:flex-nowrap">
          <Link to="home" className="flex shrink-0 items-center gap-3" aria-label="Kalyana Manager home">
            <span
              className="grid size-10 place-items-center rounded-full border-2 border-gold-300 bg-gold-50 text-lg font-bold text-saffron"
              aria-hidden="true"
            >
              க
            </span>
            <span className="text-base font-bold tracking-tight sm:text-lg">Kalyana Manager</span>
          </Link>

          <form
            className="order-3 flex h-11 min-w-0 basis-full overflow-hidden rounded-md bg-white focus-within:ring-2 focus-within:ring-gold-400 lg:order-none lg:flex-1 lg:basis-auto"
            role="search"
            onSubmit={handleSearch}
          >
            <label className="relative flex shrink-0 items-center border-r border-line bg-[#f3f1ee] text-muted">
              <span className="sr-only">Category</span>
              <select
                className="h-full cursor-pointer appearance-none bg-transparent pr-8 pl-4 text-xs"
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategoryKey | 'all')}
              >
                <option value="all">All</option>
                {ServiceCategories.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.title}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-2.5" aria-hidden="true" />
            </label>
            <label className="min-w-0 flex-1">
              <span className="sr-only">Search</span>
              <input
                type="search"
                className="size-full px-3.5 text-[13px] text-ink placeholder:text-[#9a918d] focus:outline-none"
                placeholder="Search caterers, decorators, halls and more"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-1.5 bg-gold-500 px-3.5 text-xs font-bold text-maroon-900 hover:bg-gold-400 sm:px-5"
            >
              <Search size={16} className="sm:hidden" aria-hidden="true" />
              <span className="max-sm:sr-only">Search</span>
            </button>
          </form>

          <nav className="ml-auto flex shrink-0 items-center gap-5 lg:ml-0 lg:gap-7" aria-label="Account">
            {user ? (
              <button
                type="button"
                onClick={signOut}
                className="group hidden cursor-pointer flex-col items-start leading-tight sm:flex"
                title="Sign out"
              >
                <small className="max-w-32 truncate text-[9px] text-white/75">Hello, {user.name}</small>
                <strong className={actionLabel}>Sign Out</strong>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => authModal.open('login')}
                className="group hidden cursor-pointer flex-col items-start leading-tight sm:flex"
              >
                <small className="text-[9px] text-white/75">Hello, sign in</small>
                <strong className={actionLabel}>Family Account</strong>
              </button>
            )}
            <Link to="bookings" className="group flex flex-col leading-tight">
              <small className="text-[9px] text-white/75">Your</small>
              <strong className={actionLabel}>Bookings</strong>
            </Link>
            <Link to="cart" className="group flex items-end gap-0.5" aria-label={`Cart, ${cartCount} items`}>
              <span className="relative">
                {/* Open-top basket, so the count has room to sit inside it. */}
                <svg
                  width="40"
                  height="32"
                  viewBox="0 0 40 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2 4h5l5 18h20l4-12" />
                  <circle cx="14" cy="27.5" r="2.2" fill="currentColor" stroke="none" />
                  <circle cx="29" cy="27.5" r="2.2" fill="currentColor" stroke="none" />
                </svg>
                <span className="absolute top-1 left-[55%] -translate-x-1/2 text-base font-bold leading-none text-gold-400">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              </span>
              <strong className={`${actionLabel} pb-1 text-sm`}>Cart</strong>
            </Link>
          </nav>
        </div>
      </div>

      <nav className="bg-maroon-700" aria-label="Services">
        <div className="container-page flex min-h-10 items-center justify-between gap-6">
          <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto">
            <li>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className={`${navLink} -ml-3 cursor-pointer`}
                aria-haspopup="dialog"
              >
                <Menu size={16} aria-hidden="true" />
                All
              </button>
            </li>
            {ServiceCategories.filter((c) => c.inNav).map((c) => (
              <li key={c.key}>
                <Link
                  to="serviceCategory"
                  params={{ category: c.key }}
                  className={navLink}
                  aria-current={activeCategory === c.key ? 'page' : undefined}
                >
                  {c.navLabel}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="deals" className="hidden shrink-0 text-[11px] font-bold text-gold-400 hover:text-gold-300 sm:block">
            Function Day Deals
          </Link>
        </div>
      </nav>

      {menuOpen && <AllMenu onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
