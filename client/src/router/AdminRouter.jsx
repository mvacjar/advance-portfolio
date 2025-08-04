import { Routes, Route } from 'react-router-dom';
import {
   Auth,
   Users,
   Blog,
   Courses,
   Menu,
   Newsletter,
} from '../pages/admin';
import { AdminLayout } from '../layouts';

const user = { email: 'mvacjar@gmail.com' };

export function AdminRouter() {
   const loadLayout = (Layout, Page) => {
      return (
         <Layout>
            <Page />
         </Layout>
      );
   };

   return (
      <Routes>
         {!user ? (
            <Route
               path='/admin/*'
               element={loadLayout(AdminLayout, Auth)}
            />
         ) : (
            <>
               {['/admin', '/admin/menu'].map((path) => (
                  <Route
                     key={path}
                     path={path}
                     element={loadLayout(AdminLayout, Menu)}
                  />
               ))}
               {['/admin', '/admin/blog'].map((path) => (
                  <Route
                     key={path}
                     path={path}
                     element={loadLayout(AdminLayout, Blog)}
                  />
               ))}
               {['/admin', '/admin/newsletter'].map((path) => (
                  <Route
                     key={path}
                     path={path}
                     element={loadLayout(AdminLayout, Newsletter)}
                  />
               ))}
               {['/admin', '/admin/courses'].map((path) => (
                  <Route
                     key={path}
                     path={path}
                     element={loadLayout(AdminLayout, Courses)}
                  />
               ))}
               <Route
                  path='/admin/users'
                  element={loadLayout(AdminLayout, Users)}
               />
            </>
         )}
      </Routes>
   );
}
