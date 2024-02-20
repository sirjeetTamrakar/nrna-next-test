import * as Yup from 'yup';

export const validationSchema = Yup.object({
  about: Yup.string().required('Please enter about')
});
