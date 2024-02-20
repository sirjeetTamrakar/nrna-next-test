import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter banner title'),
  subtitle: Yup.string().required('Please enter subtitle for banner'),
  image: Yup.mixed()
    .transform((v) => (!v ? undefined : v))
    .nullable()
    .required('Please upload banner photo')
});

export const editValidationSchema = Yup.object({
  title: Yup.string().required('Please enter banner title'),
  subtitle: Yup.string().required('Please enter subtitle for banner')
});
