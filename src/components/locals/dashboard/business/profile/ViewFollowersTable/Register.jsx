import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../userManagement/redux/actions";
// import { createUser } from '../redux/actions';
import MemberForm from "./Form";
import { useStyles } from "./styles";
import { validationSchema } from "./ValidationSchema";

const Register = ({ handleClose, countrySlug }) => {
  const defaultValues = {
    country_of_residence: countrySlug,
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const { create_user_loading } = useSelector((state) => state.user);
  const onSubmit = (data) => {
    const roleData = { country: countrySlug };
    dispatch(createUser(data, roleData, handleClose));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <MemberForm countrySlug={countrySlug} />
          <Box className={classes.footerRoot}>
            <CustomButton
              buttonName="Create Member"
              loading={create_user_loading}
            />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
