import * as Yup from 'yup';

export const validationSchema = Yup.object({
  business_title: Yup.string().required('Please enter title'),
  business_banner_title: Yup.string().required('Please enter banner title'),
  business_banner_subtitle: Yup.string().required('Please enter banner subtitle'),
  business_description: Yup.string().required('Please enter description')
});
