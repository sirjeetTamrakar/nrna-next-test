import * as Yup from 'yup';

export const validationSchema = Yup.object({
  order_number: Yup.string().required('Please enter the order for the news')
  // feature_image: Yup.mixed()
  //   .transform((v) => (!v ? undefined : v))
  //   .nullable()
  //   .required('Image is required'),
  // description: Yup.string().required('Please enter description'),
  // created_by: Yup.string().required('Please select author'),
  // news_id: Yup.string().required('Please select news')
});

export const editValidationSchema = Yup.object({
  order_number: Yup.string().required('Please enter the order for the news')
  // description: Yup.string().required('Please enter description'),
  // created_by: Yup.string().required('Please select author'),
  // news_id: Yup.string().required('Please select news')
});
