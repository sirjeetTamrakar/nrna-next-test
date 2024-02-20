import * as Yup from 'yup';

export const validationSchema = Yup.object({
  ncc_title: Yup.string().required('Please enter title'),
  ncc_banner_title: Yup.string().required('Please enter banner title'),
  ncc_banner_subtitle: Yup.string().required('Please enter banner subtitle'),
  ncc_description: Yup.string().required('Please enter description')
});
