import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import VisionForm from "./Form";
import { validationSchema } from "./ValidationSchema";

const Register = () => {
  const defaultValues = {};

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <VisionForm />
      </CustomFormProvider>
    </>
  );
};

export default Register;
