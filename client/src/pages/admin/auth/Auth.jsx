import { useState, useEffect } from 'react';
import { Icon } from '../../../assets';
import { RegisterForm, LoginForm } from '../../../components/admin/auth';
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
    if (registered) {
      setActiveIndex('login');
      setRegistered(false);
    }
  }, [registered]);

  const onSignUp = async () => {
    //   Register Logic
    setRegistered(true);
  };

  // const onLogin = async () => {
  // Login Logic
  // }

  const tabListStyles = {
    '& .MuiTab-root': {
      backgroundColor: 'rgba(30,30,30,0.6)',
      fontWeight: 'bold',
      color: '#667',
      flex: 1,
      transition: 'background-color 0.3s ease',
      '&:hover:not(.Mui-selected)': {
        color: '#a47a3b',
      },
      '&.Mui-selected': {
        color: '#fc9f14',
        backgroundColor: 'rgba(50,50,50,0.6)',
        borderRadius: 0,
      },
    },
    // Unselected Tabs
    '& .MuiTab-root:nth-of-type(1):not(.Mui-selected)': {
      borderTopLeftRadius: '10px',
    },
    '& .MuiTab-root:nth-of-type(2):not(.Mui-selected)': {
      borderTopRightRadius: '10px',
    },
    // Selected Tabs
    '& .MuiTab-root:nth-of-type(1).Mui-selected': {
      borderTopLeftRadius: '10px',
    },
    '& .MuiTab-root:nth-of-type(2).Mui-selected': {
      borderTopRightRadius: '10px',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#fc9f14',
    },
  };

  const formControlStyles = {
    width: '80%',

    '& .MuiInputLabel-root': {
      color: '#fc9f14',
      marginLeft: '-8px',
      whiteSpace: 'nowrap',

      '&.Mui-focused': {
        color: '#fc9f14',
      },
      '&:hover': {
        color: '#a47a3b',
        opacity: 0.8,
      },
    },
    '& .MuiInput-root': {
      color: '#f5f3f0',
      width: '100%',
      '&:before': {
        borderBottomColor: '#fc9f14',
        borderBottomWidth: '2px',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#fc9f14',
        borderBottomWidth: '2px',
      },
      '&:after': {
        borderBottomColor: '#fc9f14',
        borderBottomWidth: '2px',
      },
    },
  };

  const boxPanelStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  };

  const buttonStyles = {
    backgroundColor: '#fc9f14',
    color: '#f5f3f0',
    fontWeight: 'bold',
    width: '50%',
    fontSize: '1rem',
    borderRadius: '5px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: '#e28a06',
      boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25)',
    },
    '&:active': {
      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.2)',
      transform: 'translateY(1px)',
    },
  };

  return (
    <>
      <div className='container'>
        <img src={Icon.LogoDark} alt='logo' className='logo' />

        <Box
          sx={{
            width: '70%',
            maxWidth: '500px',
            backgroundColor: 'rgba(50,50,50,0.6)',
            borderRadius: '10px',
            flexShrink: '0',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <TabContext value={activeIndex}>
            <Box
              sx={{
                width: '100%',
              }}
            >
              <TabList
                onChange={handleChange}
                variant='fullWidth'
                sx={tabListStyles}
              >
                <Tab
                  label='Login'
                  value='login'
                  sx={{ fontSize: '1rem' }}
                />
                <Tab
                  label='Sign up'
                  value='signup'
                  sx={{ fontSize: '1rem' }}
                />
              </TabList>
            </Box>
            <TabPanel value='login'>
              <LoginForm
                boxPanelStyles={boxPanelStyles}
                formControlStyles={formControlStyles}
                buttonStyles={buttonStyles}
              />
              {/* <Box
                sx={{
                  ...boxPanelStyles,
                  minHeight: '225px',
                }}
              >
                <FormControl sx={formControlStyles}>
                  <InputLabel htmlFor='email'>Email</InputLabel>
                  <Input id='email' type='text' />
                </FormControl>
                <FormControl sx={formControlStyles}>
                  <InputLabel htmlFor='password'>Password</InputLabel>
                  <Input id='password' type='password' />
                </FormControl>
                <Button
                  variant='contained'
                  sx={{ ...buttonStyles, marginTop: '2rem' }}
                >
                  Login
                </Button>
              </Box> */}
            </TabPanel>
            <TabPanel value='signup'>
              <RegisterForm
                boxPanelStyles={boxPanelStyles}
                formControlStyles={formControlStyles}
                buttonStyles={buttonStyles}
                onSignUp={onSignUp}
              />
              {/* <Box
                sx={{
                  ...boxPanelStyles,
                  minHeight: '400px',
                  gap: 1,
                }}
              >
                <FormControl sx={formControlStyles}>
                  <InputLabel htmlFor='name'>Name</InputLabel>
                  <Input id='name' type='text' />
                </FormControl>
                <FormControl sx={formControlStyles}>
                  <InputLabel htmlFor='signup-email'>Email</InputLabel>
                  <Input id='signup-email' type='email' />
                </FormControl>
                <FormControl sx={formControlStyles}>
                  <InputLabel htmlFor='signup-password'>
                    Password
                  </InputLabel>
                  <Input id='signup-password' type='password' />
                </FormControl>
                <FormControl sx={formControlStyles}>
                  <InputLabel htmlFor='repeat-password'>
                    Repeat Password
                  </InputLabel>
                  <Input id='repeat-password' type='password' />
                </FormControl>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color='#fc9f14'
                        sx={{
                          color: '#fc9f14',
                        }}
                      />
                    }
                    label='I have read and accept the privacy policies'
                    sx={{
                      color: '#f5f3f0',
                      marginTop: '1rem',
                      gap: 1,
                    }}
                  />
                </FormGroup>
                <Button
                  onClick={onSignUp}
                  variant='contained'
                  sx={{
                    ...buttonStyles,
                    marginTop: '1rem',
                  }}
                >
                  Sign up
                </Button>
              </Box> */}
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
