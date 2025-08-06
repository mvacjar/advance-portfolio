import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

export function RegisterForm({
  boxPanelStyles,
  formControlStyles,
  onSignUp,
  buttonStyles,
}) {
  return (
    <>
      <Box
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
          <InputLabel htmlFor='signup-password'>Password</InputLabel>
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
      </Box>
    </>
  );
}
