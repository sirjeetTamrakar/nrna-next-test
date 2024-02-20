import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter template title'),
  description: Yup.string().required('Please enter email template'),
  business_id: Yup.string().required('Please select a business')
});

export const editValidationSchema = Yup.object({
  title: Yup.string().required('Please enter template title'),
  description: Yup.string().required('Please enter enter email template'),
  business_id: Yup.string().required('Please select a business')
});
