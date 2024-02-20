import * as Yup from 'yup';

export const validationSchema = Yup.object({
  vision: Yup.string().required('Please enter vision')
});
