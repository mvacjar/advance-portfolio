import * as Yup from 'yup';

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .required('Invalid email address')
      .matches(/^\S+@\S+$/),
    password: Yup.string()
      .required('Password must have at least 6 characters')
      .min(6, ''),
    repeatPassword: Yup.string()
      .required('Passwords do not match')
      .oneOf([Yup.ref('password')]),
    termsOfService: Yup.bool().oneOf(
      [true],
      'You must accept the privacy policies'
    ),
  });
}
