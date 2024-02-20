import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  author: Yup.string().required('Please enter authors name'),
  articleImage: Yup.mixed()
    .transform((v) => (!v ? undefined : v))
    .nullable()
    .required('Image is required'),
  description: Yup.string().required('Please enter description'),
  excerpt: Yup.string().required('Please enter excerpt').max(300)
});

export const editValidationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  // articleImage: Yup.mixed()
  //   .transform((v) => (!v ? undefined : v))
  //   .nullable()
  //   .required('Image is required'),
  description: Yup.string().required('Please enter description'),
  excerpt: Yup.string().required('Please enter excerpt').max(300),
  author: Yup.string().required('Please enter authors name')
});
