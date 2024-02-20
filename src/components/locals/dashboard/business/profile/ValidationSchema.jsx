import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  feature_image: Yup.mixed()
    .transform((v) => (!v ? undefined : v))
    .nullable()
    .required('Image is required'),
  description: Yup.string().required('Please enter description'),
  created_by: Yup.string().required('Please select author')
});

export const editValidationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  description: Yup.string().required('Please enter description'),
  created_by: Yup.string().required('Please select author')
});

export const serviceValidationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  description: Yup.string().required('Please enter description'),
  service_image: Yup.mixed()
    .transform((v) => (!v ? undefined : v))
    .nullable()
    .required('Image is required')
});
