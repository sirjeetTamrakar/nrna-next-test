import * as Yup from 'yup';

export const validationSchema = Yup.object({
  member_id: Yup.string().required('Please select member'),
  designation: Yup.string().required('Please enter designation'),
  order: Yup.number().typeError('You must enter number').required('Please enter order')
});
