import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomPasswordInput from "@/components/common/Form/CustomPasswordInput";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { completeRegistration } from "@/redux/auth/actions";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
const CompleteRegistration = () => {
  const defaultValues = {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { loading } = useSelector((state) => state.auth);
  const validationSchema = Yup.object({
    password: Yup.string().required("Please enter your password"),
    password_confirmation: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const handleSuccess = () => {
    navigate("/");
  };

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      token: params?.get("token"),
    };
    dispatch(completeRegistration(finalData, handleSuccess));
  };

  return (
    <CustomFormProvider
      defaultValues={defaultValues}
      resolver={useYupValidationResolver(validationSchema)}
    >
      <CustomForm onSubmit={onSubmit}>
        <div className="login_wrapper">
          <div className="title">Complete user registration</div>
          <div className="subtitle">
            Regain Control of Your Account by entering your new password
          </div>
          <Box display="flex" flexDirection="column" rowGap={`15px`}>
            {/* <CustomPasswordInput name="old_password" label="Old Password" /> */}
            <CustomPasswordInput name="password" label="Create Password" />
            <CustomPasswordInput
              name="password_confirmation"
              label="Confirm Password"
            />
          </Box>

          <CustomButton buttonName="Submit" fullWidth loading={loading} />
        </div>
      </CustomForm>
    </CustomFormProvider>
  );
};

export default CompleteRegistration;
