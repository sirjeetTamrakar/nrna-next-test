import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import AboutForm from "./Form";
import { validationSchema } from "./ValidationSchema";

const Register = () => {
  const defaultValues = {};

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <AboutForm />
      </CustomFormProvider>
    </>
  );
};

export default Register;
