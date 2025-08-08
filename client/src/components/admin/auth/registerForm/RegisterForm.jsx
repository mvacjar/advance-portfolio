import { useState } from 'react';
import { useFormik } from 'formik';
import { InitialValues, ValidationSchema } from './RegisterForm.form';
import { Auth } from '../../../../api/auth';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const authController = new Auth();

export function RegisterForm({
  boxPanelStyles,
  formControlStyles,
  onSignUp,
  buttonStyles,
  openLogin,
}) {
  const [error, setError] = useState('');
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisiblePasswordRepeat, setIsVisiblePasswordRepeat] = useState(false);
  const formik = useFormik({
    initialValues: InitialValues(),
    validationSchema: ValidationSchema(),
    validationOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError('');
        await authController.register(formValue);
        openLogin();
      } catch (error) {
        setError('Error during registration:', error);
      }
    },
  });

  const handleVisiblePassword = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const handleVisiblePasswordRepeat = () => {
    setIsVisiblePasswordRepeat((prev) => !prev);
  };

  return (
    <>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        sx={{
          ...boxPanelStyles,
          minHeight: '400px',
          gap: 1,
        }}
      >
        <FormControl sx={formControlStyles}>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input
            name='username'
            id='username'
            type='text'
            autoComplete='name'
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.errors.username && formik.touched.username && (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          )}
        </FormControl>
        <FormControl sx={formControlStyles}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <Input
            name='email'
            id='email'
            type='email'
            autoComplete='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
        </FormControl>
        <FormControl sx={formControlStyles}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            name='password'
            id='password'
            autoComplete='new-password'
            onChange={formik.handleChange}
            value={formik.values.password}
            type={isVisiblePassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleVisiblePassword}
                  edge='end'
                  sx={{ color: '#fc9f14', marginRight: '0px' }}
                >
                  {isVisiblePassword ? (
                    <Visibility fontSize='small' />
                  ) : (
                    <VisibilityOff fontSize='small' />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.errors.password && formik.touched.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
        </FormControl>
        <FormControl sx={formControlStyles}>
          <InputLabel htmlFor='repeatPassword'>Repeat Password</InputLabel>
          <Input
            name='repeatPassword'
            id='repeatPassword'
            autoComplete='new-password'
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            type={isVisiblePasswordRepeat ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleVisiblePasswordRepeat}
                  edge='end'
                  sx={{ color: '#fc9f14', marginRight: '0px' }}
                >
                  {isVisiblePasswordRepeat ? (
                    <Visibility fontSize='small' />
                  ) : (
                    <VisibilityOff fontSize='small' />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {formik.errors.repeatPassword && formik.touched.repeatPassword && (
            <div style={{ color: 'red' }}>{formik.errors.repeatPassword}</div>
          )}
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name='privacyPolicy'
                color='#fc9f14'
                onChange={(event) =>
                  formik.setFieldValue('privacyPolicy', event.target.checked)
                }
                checked={formik.values.privacyPolicy}
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
          {formik.errors.privacyPolicy && formik.touched.privacyPolicy && (
            <div style={{ color: 'red' }}>{formik.errors.privacyPolicy}</div>
          )}
        </FormGroup>
        <Button
          onClick={onSignUp}
          type='submit'
          variant='contained'
          loading={formik.isSubmitting}
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
