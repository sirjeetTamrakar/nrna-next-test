import * as Yup from 'yup';

export const validationSchema = Yup.object({
  mission: Yup.string().required('Please enter mission')
});
