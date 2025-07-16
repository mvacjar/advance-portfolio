import { useState } from 'react';
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useFormik } from 'formik';
import { initialValue, validationSchema } from './registerForm.form';
import { Auth } from '../../../../../api';

const authController = new Auth();

export default function RegisterForm(props) {
  const { userRegistered } = props;
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValues => {
      try {
        setError('');
        await authController.register(formValues);
        userRegistered();
      } catch (err) {
        setError('There was an error');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextInput
        withAsterisk
        label='Email'
        placeholder='your@email.com'
        name='email'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
        mt='md'
        ml='md'
        mr='md'
      />

      <TextInput
        withAsterisk
        label='Password'
        placeholder='password'
        name='password'
        type='password'
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
        mt='md'
        ml='md'
        mr='md'
      />

      <TextInput
        withAsterisk
        label='Repeat Password'
        placeholder='repeat password'
        name='repeatPassword'
        type='password'
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.repeatPassword && formik.errors.repeatPassword}
        mt='md'
        ml='md'
        mr='md'
      />

      <Checkbox
        label='I have read and accept the privacy policies'
        name='termsOfService'
        checked={formik.values.termsOfService}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.termsOfService && formik.errors.termsOfService}
        mt='lg'
        ml='md'
        mr='md'
      />

      {error && (
        <p className='register_form_error' mt='lg' ml='md' mr='md'>
          {error}
        </p>
      )}

      <Group justify='flex-end' mt='md' mr='md'>
        <Button type='submit' loading={formik.isSubmitting}>
          Submit
        </Button>
      </Group>
    </form>
  );
}
