import React, { useState } from 'react';
import { redirect, useActionData } from 'react-router';
import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { ENV } from '../../../../utils/constants';
import { validationSchema } from './register.validation';

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');
  const termsOfService = formData.get('termsOfService') === 'on';

  // Crear objeto de datos para validar
  const formValues = {
    email,
    password,
    repeatPassword,
    termsOfService,
  };

  // Validación con Yup en el servidor
  try {
    await validationSchema().validate(formValues, { abortEarly: false });
  } catch (validationError) {
    // Convertir errores de Yup al formato esperado
    const errors = {};
    validationError.inner.forEach(error => {
      errors[error.path] = error.message;
    });
    return { errors };
  }

  try {
    // Llamar a tu API existente
    const response = await fetch(`${ENV.BASE_API}/${ENV.API_ROUTES.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: {
          general:
            errorData.message || 'Registration failed. Please try again.',
        },
      };
    }

    const data = await response.json();

    // Si tu API devuelve un token, puedes configurar la cookie
    if (data.token) {
      return redirect('/admin/login', {
        headers: {
          'Set-Cookie': `token=${data.token}; HttpOnly; Secure; SameSite=Strict; Path=/`,
        },
      });
    }

    // Si no hay token, simplemente redirige
    return redirect('/admin/login');
  } catch (error) {
    console.error('Registration error:', error);
    return { errors: { general: 'Registration failed. Please try again.' } };
  }
}

export default function RegisterForm() {
  const actionData = useActionData();
  const errors = actionData?.errors || {};
  const [clientErrors, setClientErrors] = useState({});

  // Validación del cliente en tiempo real
  const validateField = async (name, value, allValues) => {
    try {
      await validationSchema().validateAt(name, allValues);
      setClientErrors(prev => ({ ...prev, [name]: '' }));
    } catch (error) {
      setClientErrors(prev => ({ ...prev, [name]: error.message }));
    }
  };

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    // Obtener valores actuales del formulario
    const formData = new FormData(e.target.form);
    const allValues = {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      repeatPassword: formData.get('repeatPassword') || '',
      termsOfService: formData.get('termsOfService') === 'on',
    };

    // Actualizar el valor actual
    allValues[name] = fieldValue;

    // Validar el campo
    validateField(name, fieldValue, allValues);
  };

  const handleSubmit = async e => {
    // Validación completa antes de enviar
    const formData = new FormData(e.target);
    const allValues = {
      email: formData.get('email') || '',
      password: formData.get('password') || '',
      repeatPassword: formData.get('repeatPassword') || '',
      termsOfService: formData.get('termsOfService') === 'on',
    };

    try {
      await validationSchema().validate(allValues, { abortEarly: false });
      setClientErrors({});
    } catch (validationError) {
      e.preventDefault();
      const newErrors = {};
      validationError.inner.forEach(error => {
        newErrors[error.path] = error.message;
      });
      setClientErrors(newErrors);
    }
  };

  return (
    <form method='post' onSubmit={handleSubmit}>
      <TextInput
        withAsterisk
        label='Email'
        placeholder='your@email.com'
        name='email'
        error={clientErrors.email || errors.email}
        onBlur={handleInputChange}
        labelProps={{ style: { fontWeight: 'bold' } }}
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
        error={clientErrors.password || errors.password}
        onBlur={handleInputChange}
        labelProps={{ style: { fontWeight: 'bold' } }}
        mt='md'
        ml='md'
        mr='md'
      />

      <TextInput
        withAsterisk
        label='Repeat password'
        placeholder='repeat password'
        name='repeatPassword'
        type='password'
        error={clientErrors.repeatPassword || errors.repeatPassword}
        onBlur={handleInputChange}
        labelProps={{ style: { fontWeight: 'bold' } }}
        mt='md'
        ml='md'
        mr='md'
      />

      <Checkbox
        label='I have read and accept the privacy policies'
        name='termsOfService'
        error={clientErrors.termsOfService || errors.termsOfService}
        onChange={handleInputChange}
        mt='lg'
        ml='md'
        mr='md'
      />

      {errors.general && (
        <p style={{ color: 'red', margin: '16px' }}>{errors.general}</p>
      )}

      <Group justify='flex-start' ml='md'>
        <Button type='submit' className='btn-submit'>
          Submit
        </Button>
      </Group>
    </form>
  );
}
