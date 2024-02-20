import * as Yup from 'yup';

export const validationSchema = Yup.object({
  address: Yup.string().required('Please enter address'),
  email: Yup.string().email().required('Please enter email'),
  phone: Yup.number().typeError('Please enter number only').required('Please enter phone number')
});
