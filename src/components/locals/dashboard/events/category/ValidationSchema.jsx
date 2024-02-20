import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter title'),
  // event_category_id: Yup.string().required('Please select Category')
  category_image: Yup.mixed()
    .transform((v) => (!v ? undefined : v))
    .nullable()
    .required('Image is required')
});

export const editValidationSchema = Yup.object({
  title: Yup.string().required('Please enter title')
  // event_category_id: Yup.string().required('Please select Category')
});
