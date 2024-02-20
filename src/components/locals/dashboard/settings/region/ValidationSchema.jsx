import * as Yup from 'yup';

export const validationSchema = Yup.object({
  name: Yup.string().required('Please enter region title')
});

export const editValidationSchema = Yup.object({
  name: Yup.string().required('Please enter region title')
});
