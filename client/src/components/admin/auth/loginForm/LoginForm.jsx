import { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function LoginForm({ boxPanelStyles, formControlStyles, buttonStyles }) {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleVisiblePassword = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  return (
    <>
      <Box
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
          <Input
            id='password'
            type={isVisiblePassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleVisiblePassword}
                  edge='end'
                  sx={{ color: '#fc9f14' }}
                >
                  {isVisiblePassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button variant='contained' sx={{ ...buttonStyles, marginTop: '2rem' }}>
          Login
        </Button>
      </Box>
    </>
  );
}
