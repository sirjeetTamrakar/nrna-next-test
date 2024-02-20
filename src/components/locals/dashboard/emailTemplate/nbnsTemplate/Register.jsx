import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import NBNSTemplateForm from "./Form";
import { validationSchema } from "./ValidationSchema";

const Register = () => {
  const defaultValues = {};

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <NBNSTemplateForm />
      </CustomFormProvider>
    </>
  );
};

export default Register;
