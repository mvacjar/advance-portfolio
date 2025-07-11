import { AdminLayout } from '../../layouts/AdminLayout';
import { Outlet } from 'react-router';

const user = {
  email: 'mvacjar@gmail.com',
};

export default function adminAuth() {
  return (
    <AdminLayout>
      {!user ? `You are not authenticated` : <Outlet />}
    </AdminLayout>
  );
}
