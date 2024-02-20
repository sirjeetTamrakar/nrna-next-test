import * as Yup from 'yup';

export const validationSchema = Yup.object({
  first_name: Yup.string().required('Please enter firstname'),
  last_name: Yup.string().required('Please enter firstname'),
  phone: Yup.string().required('Please enter firstname')
});
