import { AdminLayout } from '../layouts/AdminLayout';
import { Outlet } from 'react-router';

export default function AuthRoute() {
  return (
    <AdminLayout>
      Estamos en AuthRoute
      <Outlet />
    </AdminLayout>
  );
}
