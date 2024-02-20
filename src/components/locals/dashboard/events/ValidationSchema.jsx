import * as Yup from 'yup';

export const validationSchema = Yup.object({
  title: Yup.string().required('Please enter event title'),
  location: Yup.string().required('Please enter event location'),
  venue: Yup.string().required('Please enter event venue'),
  event_date: Yup.string().required('Please enter event date'),
  event_time: Yup.string().required('Please enter event time'),
  contact_email: Yup.string().email().required('Please enter email'),
  contact_phone: Yup.string()
    .typeError('It must be a number')
    .required('Phone number is required')
    .min(10)
    .max(10)
});
