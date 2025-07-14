import './adminAuth.scss';
import { Icon } from '../../../../assets/index';
import { Tabs } from '@mantine/core';
import { IconUserShield, IconUserPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function adminAuth() {
  const [activeTab, setActiveTab] = useState('login');
  const [userRegistered, setUserRegistered] = useState(0);
  const openLogin = () => setUserRegistered(0);

  useEffect(() => {
    if (userRegistered === 1) {
      setActiveTab('register');
    }
  }, [userRegistered]);

  return (
    <>
      <header>
        <nav>
          <Icon.LogoDark className='logo' />
        </nav>
      </header>
      <Tabs
        radius='md'
        value={activeTab}
        defaultValue='login'
        onChange={data => {
          setActiveTab(data);
          console.log(data);
        }}
      >
        <Tabs.List>
          <Tabs.Tab
            value='login'
            className={activeTab === 'login' ? 'active-tab' : 'fade-tab'}
            leftSection={
              <IconUserShield
                size={20}
                className={activeTab === 'login' ? 'active-tab' : 'fade-tab'}
              />
            }
          >
            Login
          </Tabs.Tab>
          <Tabs.Tab
            value='register'
            className={activeTab === 'register' ? 'active-tab' : 'fade-tab'}
            leftSection={
              <IconUserPlus
                size={20}
                className={activeTab === 'register' ? 'active-tab' : 'fade-tab'}
              />
            }
          >
            Register
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='login'></Tabs.Panel>
        <Tabs.Panel value='register'></Tabs.Panel>
      </Tabs>
    </>
  );
}
