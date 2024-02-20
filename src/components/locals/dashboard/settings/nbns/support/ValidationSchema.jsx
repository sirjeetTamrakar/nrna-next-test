import * as Yup from 'yup';

export const validationSchema = Yup.object({
  support_title: Yup.string().required('Please enter survey title')
});
