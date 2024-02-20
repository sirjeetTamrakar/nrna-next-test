import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postEmailTemplate } from "../redux/actions";
import BusinessTemplateForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();

  const { email_template_loading } = useSelector(
    (state) => state.emailTemplate
  );
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    let typeData;
    typeData = {
      page: 1,
      pagination_limit: 10,
      email_type: "business",
    };
    dispatch(postEmailTemplate(data, typeData, handleClose));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <BusinessTemplateForm />
          <Box className={classes.footerRoot}>
            <CustomButton
              buttonName="Create Business email template"
              loading={email_template_loading}
            />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
