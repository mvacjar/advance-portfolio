import { useState } from 'react';
import { Icon } from '../../../assets';
import './Auth.scss';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

export function Auth() {
   const [value, setValue] = useState('1');

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   // Estilos comunes para FormControl
   const formControlStyles = {
      width: '250px',

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
         '&:before': {
            borderBottomColor: '#fc9f14',
            borderBottomWidth: '2px',
            width: '250px',
         },
         '&:hover:not(.Mui-disabled):before': {
            borderBottomColor: '#fc9f14',
            borderBottomWidth: '2px',
            width: '250px',
         },
         '&:after': {
            borderBottomColor: '#fc9f14',
            borderBottomWidth: '2px',
            width: '250px',
         },
      },
   };

   return (
      <>
         <div className='container'>
            <img src={Icon.LogoDark} alt='logo' className='logo' />
            <h1>Auth is being used</h1>
            <Box
               sx={{
                  width: '400px',
                  backgroundColor: '#222222',
                  borderRadius: '10px',
               }}
            >
               <TabContext value={value}>
                  <Box
                     sx={{
                        width: '400px',
                     }}
                  >
                     <TabList
                        onChange={handleChange}
                        aria-label='lab API tabs example'
                        sx={{
                           '& .MuiTab-root': {
                              color: '#667',
                              fontWeight: 'bold',
                              '&:hover:not(.Mui-selected)': {
                                 color: '#a47a3b',
                                 opacity: 0.8,
                              },
                              '&.Mui-selected': {
                                 color: '#fc9f14',
                                 backgroundColor: '#2d2d2d',
                              },
                           },
                           '& .MuiTabs-indicator': {
                              backgroundColor: '#fc9f14',
                           },
                        }}
                     >
                        <Tab label='Login' value='1' />
                        <Tab label='Sign up' value='2' />
                     </TabList>
                  </Box>
                  <TabPanel value='1'>
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           gap: 2,
                        }}
                     >
                        <FormControl sx={formControlStyles}>
                           <InputLabel htmlFor='email'>Email</InputLabel>
                           <Input id='email' type='text' />
                        </FormControl>
                        <FormControl sx={formControlStyles}>
                           <InputLabel htmlFor='password'>
                              Password
                           </InputLabel>
                           <Input id='password' type='password' />
                        </FormControl>
                     </Box>
                  </TabPanel>
                  <TabPanel value='2'>
                     <Box
                        sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           gap: 2,
                        }}
                     >
                        <FormControl sx={formControlStyles}>
                           <InputLabel htmlFor='name'>Name</InputLabel>
                           <Input id='name' type='text' />
                        </FormControl>
                        <FormControl sx={formControlStyles}>
                           <InputLabel htmlFor='signup-email'>
                              Email
                           </InputLabel>
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
                     </Box>
                  </TabPanel>
               </TabContext>
            </Box>
         </div>
      </>
   );
}
