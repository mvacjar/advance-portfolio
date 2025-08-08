import { useState, useEffect } from 'react';
import { Icon } from '../../../assets';
import { RegisterForm, LoginForm } from '../../../components/admin/auth';
import {
  boxWrapperStyles,
  tabListStyles,
  boxPanelStyles,
  formControlStyles,
  buttonStyles,
} from './authStyles';
import './Auth.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export function Auth() {
  const [activeIndex, setActiveIndex] = useState('login');
  const [registered, setRegistered] = useState(false);

  const handleChange = (event, newValue) => {
    setActiveIndex(newValue);
  };

  useEffect(() => {
    setActiveIndex((prev) => prev);
    if (registered) {
      setRegistered(false);
    }
  }, [registered]);

  const onSignUp = async () => {
    //   Register Logic
    setRegistered(true);
  };

  return (
    <>
      <div className='container'>
        <img src={Icon.LogoDark} alt='logo' className='logo' />

        <Box sx={boxWrapperStyles}>
          <TabContext value={activeIndex}>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <TabList
                onChange={handleChange}
                variant='fullWidth'
                sx={tabListStyles(activeIndex)}
              >
                <Tab label='Login' value='login' sx={{ fontSize: '1rem' }} />
                <Tab label='Sign up' value='signup' sx={{ fontSize: '1rem' }} />
              </TabList>
            </Box>
            <TabPanel value='login'>
              <LoginForm
                boxPanelStyles={boxPanelStyles}
                formControlStyles={formControlStyles}
                buttonStyles={buttonStyles}
              />
            </TabPanel>
            <TabPanel value='signup'>
              <RegisterForm
                boxPanelStyles={boxPanelStyles}
                formControlStyles={formControlStyles}
                buttonStyles={buttonStyles}
                onSignUp={onSignUp}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
