import { useEffect, useId, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { ChevronDown, ChevronRight, CircleUserRound, X } from 'lucide-react';
import type { RouteKey } from '../../constants/routes';
import { ServiceCategories } from '../../constants/services';
import { useAuth } from '../../context/AuthContext';
import { useAuthModal } from '../../context/AuthModalContext';
import { Link } from '../common/Link';

interface AllMenuProps {
  onClose: () => void;
}

/** Categories shown before "See all". */
const VISIBLE_CATEGORIES = 4;

// `as const` keeps the exact route keys, so Link knows none of them need params.
const PlanLinks = [
  { to: 'events', label: 'My Events' },
  { to: 'guests', label: 'Guest List' },
  { to: 'bookings', label: 'Your Bookings' },
  { to: 'cart', label: 'Cart' },
] as const satisfies readonly { to: RouteKey; label: string }[];

const itemClass = 'flex w-full cursor-pointer items-center justify-between px-9 py-3 text-left text-sm hover:bg-maroon-900/5';

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-line py-2 last:border-b-0">
      <h2 className="px-9 pt-3 pb-2 text-lg font-bold text-ink">{title}</h2>
      <ul>{children}</ul>
    </section>
  );
}

/** Slide-in side menu opened from the "All" button in the header. */
export function AllMenu({ onClose }: AllMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const { user, signOut } = useAuth();
  const authModal = useAuthModal();
  const [showAllCategories, setShowAllCategories] = useState(false);

  // showModal() gives us the top layer, focus trapping and Escape-to-close for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // The dialog fills the screen; clicks on its empty area (outside the panel) close it.
  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === dialogRef.current) onClose();
  };

  const signIn = () => {
    onClose();
    authModal.open('login');
  };

  const categories = showAllCategories ? ServiceCategories : ServiceCategories.slice(0, VISIBLE_CATEGORIES);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-0 size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-black/70"
    >
      <aside className="flex h-full w-[min(365px,calc(100%-3.5rem))] flex-col bg-white text-ink transition-transform duration-300 starting:-translate-x-full">
        <button
          type="button"
          onClick={user ? undefined : signIn}
          disabled={!!user}
          className="flex shrink-0 items-center gap-3 bg-maroon-900 px-9 py-3.5 text-left text-white enabled:cursor-pointer"
        >
          <CircleUserRound size={28} aria-hidden="true" />
          <span id={titleId} className="truncate text-lg font-bold">
            Hello, {user ? user.name : 'sign in'}
          </span>
        </button>

        <nav className="flex-1 overflow-y-auto" aria-label="All menu">
          <Section title="Wedding Services">
            <li>
              <Link to="services" onClick={onClose} className={itemClass}>
                All Services
                <ChevronRight size={18} className="text-muted" aria-hidden="true" />
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.key}>
                <Link to="serviceCategory" params={{ category: c.key }} onClick={onClose} className={itemClass}>
                  {c.title}
                  <ChevronRight size={18} className="text-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
            {ServiceCategories.length > VISIBLE_CATEGORIES && (
              <li>
                <button
                  type="button"
                  onClick={() => setShowAllCategories((v) => !v)}
                  aria-expanded={showAllCategories}
                  className={`${itemClass} justify-start gap-2`}
                >
                  {showAllCategories ? 'See less' : 'See all'}
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform ${showAllCategories ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </li>
            )}
          </Section>

          <Section title="Plan Your Wedding">
            {PlanLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} onClick={onClose} className={itemClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </Section>

          <Section title="Offers">
            <li>
              <Link to="deals" onClick={onClose} className={itemClass}>
                Function Day Deals
              </Link>
            </li>
          </Section>

          <Section title="Help & Settings">
            <li>
              <Link to="account" onClick={onClose} className={itemClass}>
                Your Account
              </Link>
            </li>
            <li>
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    signOut();
                    onClose();
                  }}
                  className={itemClass}
                >
                  Sign Out
                </button>
              ) : (
                <button type="button" onClick={signIn} className={itemClass}>
                  Sign In
                </button>
              )}
            </li>
          </Section>
        </nav>
      </aside>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-2.5 left-[calc(min(365px,100%-3.5rem)+0.625rem)] grid size-9 cursor-pointer place-items-center text-white transition hover:bg-white/10"
        aria-label="Close menu"
      >
        <X size={30} aria-hidden="true" />
      </button>
    </dialog>
  );
}
