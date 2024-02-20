/* Build in libraries */

/* Third party libraries */
import { FormProvider, useForm } from 'react-hook-form';

const CustomFormProvider = ({ children, defaultValues, resolver }) => {
  const methods = useForm({ defaultValues: defaultValues, resolver });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default CustomFormProvider;
