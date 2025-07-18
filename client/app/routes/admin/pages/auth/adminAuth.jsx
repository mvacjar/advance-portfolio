// import './adminAuth.scss';
// import { Icon } from '../../../../assets/index';
// import { Tabs } from '@mantine/core';
// import { IconUserShield, IconUserPlus } from '@tabler/icons-react';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router';
// import Register from '../register/register';
// import Login from '../login/login';

// export default function adminAuth() {
//   const [activeTab, setActiveTab] = useState('login');
//   const [userRegistered, setUserRegistered] = useState(false);

//   useEffect(() => {
//     if (userRegistered === true) {
//       setActiveTab('login');
//       setUserRegistered(false);
//     }
//   }, [userRegistered]);

//   return (
//     <>
//       <header>
//         <nav>
//           <Icon.LogoDark className='logo' />
//         </nav>
//       </header>
//       <Tabs
//         radius='md'
//         value={activeTab}
//         defaultValue='login'
//         onChange={data => {
//           setActiveTab(data);
//           console.log(data);
//         }}
//       >
//         <Tabs.List>
//           <Link to='login' className='dashboard-link'>
//             <Tabs.Tab
//               value='login'
//               className={activeTab === 'login' ? 'active-tab' : 'fade-tab'}
//               leftSection={
//                 <IconUserShield
//                   size={20}
//                   className={activeTab === 'login' ? 'active-tab' : 'fade-tab'}
//                 />
//               }
//             >
//               Login
//             </Tabs.Tab>
//           </Link>
//           <Link to='register' className='dashboard-link'>
//             <Tabs.Tab
//               value='register'
//               className={activeTab === 'register' ? 'active-tab' : 'fade-tab'}
//               leftSection={
//                 <IconUserPlus
//                   size={20}
//                   className={
//                     activeTab === 'register' ? 'active-tab' : 'fade-tab'
//                   }
//                 />
//               }
//             >
//               Register
//             </Tabs.Tab>
//           </Link>
//         </Tabs.List>

//         <Tabs.Panel value='login'>
//           <Login />
//         </Tabs.Panel>
//         <Tabs.Panel value='register'>
//           {/* <RegisterForm userRegistered={() => setUserRegistered(true)} /> */}
//           <Register userRegistered={() => setUserRegistered(true)} />
//         </Tabs.Panel>
//       </Tabs>
//     </>
//   );
// }

import './adminAuth.scss';
import { Icon } from '../../../../assets/index';
import { IconUserShield, IconUserPlus } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router';
import { Outlet } from 'react-router';

export default function AdminAuth() {
  const location = useLocation();
  const isLogin = location.pathname.endsWith('/login');
  const isRegister = location.pathname.endsWith('/register');

  return (
    <>
      <header>
        <nav>
          <Icon.LogoDark className='logo' />
        </nav>
      </header>

      <div className='auth-container'>
        <div className='auth-tabs'>
          <Link
            to='/admin/login'
            className={`auth-tab ${isLogin ? 'active-tab' : 'fade-tab'}`}
          >
            <IconUserShield size={20} className='icon' />
            <span>Login</span>
          </Link>
          <Link
            to='/admin/register'
            className={`auth-tab ${isRegister ? 'active' : 'fade-tab'}`}
          >
            <IconUserPlus size={20} className='icon' />
            <span>Register</span>
          </Link>
        </div>

        <div className='auth-panel'>
          <Outlet />
        </div>
      </div>
    </>
  );
}
