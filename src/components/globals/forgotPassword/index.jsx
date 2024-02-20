import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { forgotPassword } from "@/redux/auth/actions";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
const ForgotPassword = () => {
  const defaultValues = {};
  const navigate = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
  });

  const handleSuccess = () => {
    navigate.push("/");
  };
  const onSubmit = (data) => {
    dispatch(forgotPassword(data, handleSuccess));
  };

  return (
    <CustomFormProvider
      defaultValues={defaultValues}
      resolver={useYupValidationResolver(validationSchema)}
    >
      <CustomForm onSubmit={onSubmit}>
        <div className="login_wrapper">
          <div className="title">Forgot Password</div>
          <div className="subtitle">Regain Access to Your Account</div>
          <Box display="flex" flexDirection="column" rowGap={`15px`}>
            <CustomInput name="email" label="Email" type="email" />
          </Box>

          <CustomButton buttonName="Submit" fullWidth loading={loading} />
        </div>
      </CustomForm>
    </CustomFormProvider>
  );
};

export default ForgotPassword;
