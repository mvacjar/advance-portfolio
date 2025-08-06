import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

export function LoginForm({
  boxPanelStyles,
  formControlStyles,
  buttonStyles,
}) {
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
          <Input id='password' type='password' />
        </FormControl>
        <Button
          variant='contained'
          sx={{ ...buttonStyles, marginTop: '2rem' }}
        >
          Login
        </Button>
      </Box>
    </>
  );
}
