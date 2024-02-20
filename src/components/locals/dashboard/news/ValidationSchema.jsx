import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  feature_image: Yup.mixed()
    .transform((v) => (!v ? undefined : v))
    .nullable()
    .required('Image is required'),
  description: Yup.string().required('Please enter description'),
  excerpt: Yup.string().required('Please enter excerpt').max(300),
  news_category_id: Yup.string().required('Please select Category')
});

export const editValidationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  description: Yup.string().required('Please enter description'),
  news_category_id: Yup.string().required('Please select Category'),
  excerpt: Yup.string().required('Please enter excerpt').max(300)
});
