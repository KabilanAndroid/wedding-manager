import { useEffect } from 'react';
import type { ReactNode } from 'react';
import type { RouteKey } from '../constants/routes';
import { useNavigation } from '../hooks/useNavigation';
import { AdminAuthProvider } from './components/AdminAuthProvider';
import { AdminLayout } from './components/AdminLayout';
import { useAdminAuth } from './context/AdminAuthContext';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import AdminCategoryPage from './pages/AdminCategoryPage';
import AdminSubCategory from './pages/AdminSubCategory';
import { AdminEventsPage } from './pages/AdminEventsPage';
import AdminOrderHistory from './pages/AdminOrderHistory';
import { AdminFoodAndCatering } from './pages/AdminFoodAndCatering';
import AdminPackageAndPricing from './pages/AdminPackageAndPricing';
import AdminPayments from './pages/AdminPayments';
import AdminCouponsAndOffers from './pages/AdminCouponsAndOffers';
import AdminReviewsAndRatings from './pages/AdminReviewsAndRatings';
import AdminNotification from './pages/AdminNotification';
import AdminSettings from './pages/AdminSettings';

/** Signed-in admin pages, keyed by route. Add a page here and a sidebar item in AdminLayout. */
const AdminPages: Partial<Record<RouteKey, () => ReactNode>> = {
  adminDashboard: () => <AdminDashboardPage />,
  adminEventspage: () => <AdminEventsPage />,
  adminOrderHistory:() => <AdminOrderHistory />,
  adminUsers: () => <AdminUsersPage />,
  adminCategories: () => <AdminCategoryPage />,
  adminSubCategories : () => <AdminSubCategory />,
  adminFoodAndCatering :() => <AdminFoodAndCatering />,
  adminPackageAndPricing : () => <AdminPackageAndPricing />,
  adminPayments : () => <AdminPayments />,
  adminCouponsAndOffers : () => <AdminCouponsAndOffers/>,
  adminReviewsAndRatings : ()=> <AdminReviewsAndRatings />,
  adminNotification : () => <AdminNotification />,
  adminSettings : () => <AdminSettings />
};

/** Everything under /admin. Rendered instead of the customer site (no customer header or session). */
export function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminRoutes />
    </AdminAuthProvider>
  );
}

function AdminRoutes() {
  const { route, navigate } = useNavigation();
  const { admin } = useAdminAuth();

  const page = route ? AdminPages[route] : undefined;

  // Signed out → login page. Signed in → never the login page; '/admin' and unknown paths → dashboard.
  const redirectToLogin = !admin && route !== 'adminLogin';
  const redirectToDashboard = Boolean(admin) && !page;

  useEffect(() => {
    if (redirectToLogin) navigate('adminLogin', { replace: true });
    else if (redirectToDashboard) navigate('adminDashboard', { replace: true });
  }, [redirectToLogin, redirectToDashboard, navigate]);

  if (redirectToLogin || redirectToDashboard) return null;
  if (!admin || !page) return <AdminLoginPage />;

  return <AdminLayout>{page()}</AdminLayout>;
}
