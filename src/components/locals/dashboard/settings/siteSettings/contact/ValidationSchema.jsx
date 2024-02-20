import * as Yup from 'yup';

export const validationSchema = Yup.object({
  contact_title: Yup.string().required('Please enter title'),
  contact_subtitle: Yup.string().required('Please enter subtitle')
});
