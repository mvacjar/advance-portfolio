import * as Yup from 'yup';

export function InitialValues() {
  return {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    privacyPolicy: false,
  };
}

export function ValidationSchema() {
  return Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    privacyPolicy: Yup.bool()
      .required('You must accept the privacy policy')
      .isTrue(true)
      .oneOf([true], 'You must accept the privacy policy'),
  });
}
