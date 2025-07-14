import { Outlet } from 'react-router';

export default function AdminLayout() {
  return (
    <>
      <h2>Estamos usando Admin Layout</h2>
      <Outlet />
    </>
  );
}
