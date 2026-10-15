import { CircleHelp } from 'lucide-react';
import { Header } from './components/layout/Header';
import { useNavigation } from './hooks/useNavigation';
import type { RouteKey } from './constants/routes';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const PageTitles: Record<Exclude<RouteKey, 'home'>, string> = {
  guests: 'Guests',
  guestDetail: 'Guest details',
  events: 'Events',
  eventDetail: 'Event details',
  functionDetail: 'Function details',
  services: 'All services',
  serviceCategory: 'Vendors',
  search: 'Search results',
  deals: 'Function Day Deals',
  bookings: 'Your bookings',
  cart: 'Cart',
  account: 'Family account',
};

function App() {
  const { route } = useNavigation();

  return (
    <>
      <Header cartCount={2} />
      {route === 'home' ? <HomePage /> : <PlaceholderPage title={route ? PageTitles[route] : 'Page not found'} />}
      <button
        type="button"
        className="fixed right-5 bottom-5 z-20 grid size-11 cursor-pointer place-items-center rounded-full bg-[#2a2a2e] text-white shadow-lg"
        aria-label="Help"
      >
        <CircleHelp size={22} aria-hidden="true" />
      </button>
    </>
  );
}

export default App;
