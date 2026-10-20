import { CircleHelp } from 'lucide-react';
import { AdminApp } from './admin/AdminApp';
import { AuthModalProvider } from './components/auth/AuthModalProvider';
import { AuthProvider } from './components/auth/AuthProvider';
import { CartProvider } from './components/cart/CartProvider';
import { Header } from './components/layout/Header';
import { useNavigation } from './hooks/useNavigation';
import type { RouteKey } from './constants/routes';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const PageTitles: Record<Exclude<RouteKey, 'home' | 'admin' | 'adminLogin' | 'adminUsers'>, string> = {
  guests: 'Guests',
  guestDetail: 'Guest details',
  events: 'Events',
  eventDetail: 'Event details',
  functionDetail: 'Function details',
  services: 'All services',
  serviceCategory: 'Vendors',
  serviceDetail: 'Service details',
  search: 'Search results',
  deals: 'Function Day Deals',
  bookings: 'Your bookings',
  cart: 'Cart',
  account: 'Family account',
};

function App() {
  const { route, pathname } = useNavigation();

  // The admin panel is its own app: no customer header, cart or login
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return <AdminApp />;

  const pageTitle = route && route in PageTitles ? PageTitles[route as keyof typeof PageTitles] : 'Page not found';

  return (
    <AuthProvider>
      <CartProvider>
        <AuthModalProvider>
          <Header />
          {route === 'home' ? (
            <HomePage />
          ) : (
            <PlaceholderPage title={pageTitle} />
          )}
          <button
            type="button"
            className="fixed right-5 bottom-5 z-20 grid size-11 cursor-pointer place-items-center rounded-full bg-[#2a2a2e] text-white shadow-lg"
            aria-label="Help"
          >
            <CircleHelp size={22} aria-hidden="true" />
          </button>
        </AuthModalProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
