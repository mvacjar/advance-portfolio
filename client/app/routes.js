import { index, route, layout } from '@react-router/dev/routes';
import Login, {
  action as loginAction,
} from './routes/admin/pages/login/login.jsx';
import Register, {
  action as registerAction,
} from './routes/admin/pages/register/register.jsx';

export default [
  layout('./routes/web/layouts/clientLayout.jsx', [
    index('routes/web/pages/home/home.jsx'),
    route('about', 'routes/web/pages/about/about.jsx'),
    route('blog', 'routes/web/pages/blog/blog.jsx'),
    route('blog/:path', 'routes/web/pages/post/post.jsx'),
    route('courses', 'routes/web/pages/courses/courses.jsx'),
  ]),

  route(
    'admin',
    'routes/admin/pages/auth/adminAuth.jsx',
    [
      route('login', 'routes/admin/pages/login/login.jsx', [], {
        action: loginAction,
      }),
      route('register', 'routes/admin/pages/register/register.jsx', [], {
        action: registerAction,
      }),
      layout('routes/admin/layouts/adminLayout.jsx', [
        route('dashboard', 'routes/admin/pages/dashboard/dashboard.jsx'),
        route('users', 'routes/admin/pages/users/users.jsx'),
        route('blog', 'routes/admin/pages/blog/blog.jsx'),
        route('courses', 'routes/admin/pages/courses/courses.jsx'),
        route('menu', 'routes/admin/pages/menu/menu.jsx'),
        route('newsletter', 'routes/admin/pages/newsletter/newsletter.jsx'),
      ]),
    ],
    { auth: true }
  ),
];
