import { useEffect } from 'react';
import { RefreshCw, Users } from 'lucide-react';
import { useGet } from '../../api/API';
import { formatDateTime } from '../../utils/format';
import { useAdminAuth } from '../context/AdminAuthContext';

/** Every customer who has signed up on the website. */
export function AdminUsersPage() {
  const { token, signOut } = useAdminAuth();
  const { data: users, error, loading, refetch } = useGet('getAdminUsers', {
    config: { headers: { Authorization: `Bearer ${token}` } },
  });

  // Expired or invalid admin token → back to the login page
  useEffect(() => {
    if (error?.status === 401) signOut();
  }, [error, signOut]);

  return (
    <main className="container-page py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-2 flex items-center gap-1.5 text-[10px] text-marigold-700">
            <Users size={14} aria-hidden="true" />
            Customers
          </p>
          <h1 className="text-2xl font-medium tracking-tight text-maroon-900">
            Users {users && <span className="text-muted">({users.length})</span>}
          </h1>
        </div>
        <button
          type="button"
          onClick={refetch}
          disabled={loading}
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2 text-xs font-bold text-maroon-900 transition hover:bg-gold-50 disabled:cursor-wait disabled:opacity-60"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {error && error.status !== 401 && (
        <p role="alert" className="mb-4 rounded-lg bg-red-50 px-3.5 py-2.5 text-xs text-red-700">
          {error.message}
        </p>
      )}

      {loading && !users && <p className="text-sm text-muted">Loading users…</p>}

      {users && users.length === 0 && <p className="text-sm text-muted">No users have signed up yet.</p>}

      {users && users.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-line bg-white">
          <table className="w-full min-w-160 text-left text-[13px]">
            <thead className="bg-cream text-[11px] tracking-wide text-muted uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Last login</th>
                <th className="px-4 py-3 font-semibold">Signed up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-ivory">
                  <td className="px-4 py-3 text-muted tabular-nums">{u.id}</td>
                  <td className="px-4 py-3 font-semibold">{u.name}</td>
                  <td className="px-4 py-3">{u.email}</td>
                  <td className="px-4 py-3 tabular-nums">{u.phone}</td>
                  <td className="px-4 py-3 text-muted">{u.last_login ? formatDateTime(u.last_login) : 'Never'}</td>
                  <td className="px-4 py-3 text-muted">{formatDateTime(u.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
