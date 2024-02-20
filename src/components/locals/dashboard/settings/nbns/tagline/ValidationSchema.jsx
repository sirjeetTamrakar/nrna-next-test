import * as Yup from 'yup';

export const validationSchema = Yup.object({
  tagline_description: Yup.string().required('Please enter tagline'),
  tagline_author: Yup.string().required('Please enter tagline by')
});
