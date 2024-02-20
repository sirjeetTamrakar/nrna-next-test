import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { useSelector } from "react-redux";
import ProfileForm from "./Form";
import { validationSchema } from "./ValidationSchema";

const Register = () => {
  const { user } = useSelector((state) => state.auth);
  const defaultValues = {
    name: user?.name,
    address: user?.address,
    phone: user?.phone,
    facebook_url: user?.facebook_url,
    instagram_url: user?.instagram_url,
    youtube_url: user?.youtube_url,
    twitter_url: user?.twitter_url,
    description: user?.description,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <ProfileForm />
      </CustomFormProvider>
    </>
  );
};

export default Register;
