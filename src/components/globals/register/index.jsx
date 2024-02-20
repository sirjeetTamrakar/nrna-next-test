import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomPasswordInput from "@/components/common/Form/CustomPasswordInput";
import CustomPhoneAutoComplete from "@/components/common/Form/CustomPhoneAutoComplete";
import { getCountries } from "@/components/locals/dashboard/ncc/redux/actions";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { registerUser } from "@/redux/auth/actions";
import { getCountriesCode } from "@/redux/homepage/actions";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Register = ({
  loginOpen,
  handleClose,
  defaultNccCountry,
  nccCode,
  signupPage,
}) => {
  const defaultValues = {
    country_of_residence: defaultNccCountry ? defaultNccCountry : "",
    phone: defaultNccCountry ? nccCode : null,
  };
  const navigate = useRouter();

  const dispatch = useDispatch();
  const [agree, setAgree] = useState(false);
  const { register_loading } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Firstname is Required"),
    last_name: Yup.string().required("Lastname is Required"),
    email: Yup.string().email().required("Email is required"),
    country_of_residence: Yup.string().required("Country of Residence"),
    password: Yup.string()
      .required("Please enter your password")
      .min(8, " Your password is too short (Min 8 Character)"),
    password_confirmation: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const handleChange = (e) => {
    setAgree(e.target.checked);
  };

  const navigateHome = () => {
    navigate.push("/");
  };

  const onSubmit = (data) => {
    dispatch(registerUser(data, signupPage ? navigateHome : handleClose));
  };

  const handleLoginOpen = () => {
    loginOpen();
    handleClose();
  };

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const { countries_list_code } = useSelector((state) => state.homepage);

  const countryListCode = countries_list_code?.map((item, index) => ({
    label: item?.name,
    value: item?.name,
    code: item?.dial_code,
  }));

  useEffect(() => {
    dispatch(getCountriesCode());
  }, []);

  const [selectedCountry, setSelectedCountry] = useState(null); // Track selected country

  const handleCountrySelection = (selectedValue) => {
    setSelectedCountry(selectedValue);
  };

  return (
    <CustomFormProvider
      defaultValues={defaultValues}
      resolver={useYupValidationResolver(validationSchema)}
    >
      <CustomForm onSubmit={onSubmit}>
        <div className="login_wrapper">
          <div className="title">Join Us</div>
          <div className="subtitle">Register to the website to browse more</div>
          <Box display="flex" flexDirection="column" rowGap={`12px`}>
            <CustomInput name="first_name" label="Firstname" required />
            <CustomInput name="last_name" label="Lastname" required />

            <CustomPhoneAutoComplete
              placeholder="Country of residence"
              name="country_of_residence"
              label="Country of residence"
              options={countryListCode ?? []}
              required
              // phoneSelect
              onCountrySelection={handleCountrySelection}
            />
            <CustomInput
              name="phone"
              label="Phone"
              defaultValue={selectedCountry}
              required
            />
            <CustomInput name="email" label="Email" type="email" required />
            <CustomPasswordInput
              name="password"
              label="New Password"
              required
            />
            <CustomPasswordInput
              name="password_confirmation"
              label="Confirm Password"
              required
            />
          </Box>
          <Box className="agree">
            <input type="checkbox" onChange={handleChange} />{" "}
            <p>
              I agree to{" "}
              <a href="/terms-and-conditions" target="_blank">
                terms & condition.
              </a>
            </p>
          </Box>
          <CustomButton
            buttonName="Register"
            fullWidth
            loading={register_loading}
            disabled={!agree}
          />
          <div className="link">
            Already have an account.{" "}
            <span onClick={handleLoginOpen}>Login</span>
          </div>
        </div>
      </CustomForm>
    </CustomFormProvider>
  );
};

export default Register;
