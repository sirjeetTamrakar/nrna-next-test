import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter department name')
});
