import * as Yup from 'yup';

export const validationSchema = Yup.object({
  advice_title: Yup.string().required('Please enter survey title')
});
