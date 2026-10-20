import { CircleHelp } from 'lucide-react';
import { AdminApp } from './admin/AdminApp';
import { AuthModalProvider } from './components/auth/AuthModalProvider';
import { AuthProvider } from './components/auth/AuthProvider';
import { CartProvider } from './components/cart/CartProvider';
import { Header } from './components/layout/Header';
import { useNavigation, useRouteParams } from './hooks/useNavigation';
import type { RouteKey } from './constants/routes';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { AllServicesPage, CategoryPages } from './pages/services';
import type { ServiceCategoryKey } from './constants/services';

// Customer routes without a real page yet. Every admin* route belongs to AdminApp, so new admin
// pages never need to be listed here.
type PlaceholderRoute = Exclude<RouteKey, 'home' | 'services' | 'serviceCategory' | `admin${string}`>;

const PageTitles: Record<PlaceholderRoute, string> = {
  guests: 'Guests',
  guestDetail: 'Guest details',
  events: 'Events',
  eventDetail: 'Event details',
  functionDetail: 'Function details',
  serviceDetail: 'Service details',
  search: 'Search results',
  deals: 'Function Day Deals',
  bookings: 'Your bookings',
  cart: 'Cart',
  account: 'Family account',
};

function App() {
  const { route, pathname } = useNavigation();
  const categoryParams = useRouteParams('serviceCategory');

  // The admin panel is its own app: no customer header, cart or login
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return <AdminApp />;

  const pageTitle = route && route in PageTitles ? PageTitles[route as PlaceholderRoute] : 'Page not found';
  const category = categoryParams?.category;
  const CategoryPage = category && category in CategoryPages ? CategoryPages[category as ServiceCategoryKey] : null;

  return (
    <AuthProvider>
      <CartProvider>
        <AuthModalProvider>
          <Header />
          {route === 'home' ? (
            <HomePage />
          ) : route === 'services' ? (
            <AllServicesPage />
          ) : CategoryPage ? (
            <CategoryPage />
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
