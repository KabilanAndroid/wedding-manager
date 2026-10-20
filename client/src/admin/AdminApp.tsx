import { useEffect } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { AdminAuthProvider } from './components/AdminAuthProvider';
import { AdminLayout } from './components/AdminLayout';
import { useAdminAuth } from './context/AdminAuthContext';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminUsersPage } from './pages/AdminUsersPage';

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

  // Signed out → login page. Signed in → never the login page; '/admin' and unknown paths → users.
  const redirectToLogin = !admin && route !== 'adminLogin';
  const redirectToUsers = Boolean(admin) && route !== 'adminUsers';

  useEffect(() => {
    if (redirectToLogin) navigate('adminLogin', { replace: true });
    else if (redirectToUsers) navigate('adminUsers', { replace: true });
  }, [redirectToLogin, redirectToUsers, navigate]);

  if (redirectToLogin || redirectToUsers) return null;
  if (!admin) return <AdminLoginPage />;

  return (
    <AdminLayout>
      <AdminUsersPage />
    </AdminLayout>
  );
}
