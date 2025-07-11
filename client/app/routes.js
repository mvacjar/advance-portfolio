import { index, route } from '@react-router/dev/routes';

export default [
  index('routes/web/pages/home.jsx'),
  route('about', 'routes/web/pages/about.jsx'),

  route(
    'admin',
    'routes/admin/pages/authRoute.jsx',
    [
      index('routes/admin/pages/admin.jsx'),
      route('dashboard', 'routes/admin/pages/dashboard.jsx'),
      route('users', 'routes/admin/pages/users.jsx'),
      route('settings', 'routes/admin/pages/settings.jsx'),
    ],
    { auth: true }
  ),
];
