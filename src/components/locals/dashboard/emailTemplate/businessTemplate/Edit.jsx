import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateEmailTemplate } from "../redux/actions";
import MemberForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { update_email_template_loading } = useSelector(
    (state) => state.emailTemplate
  );
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("business_id", data?.business_id);
    formData.append("_method", "PUT");

    const typeData = {
      page: 1,
      pagination_limit: 10,
      email_type: "business",
    };
    dispatch(updateEmailTemplate(formData, detail?.id, typeData, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <MemberForm banner_image={detail?.image} />
      <Box className={classes.footerRoot}>
        <CustomButton
          buttonName="Update"
          loading={update_email_template_loading}
        />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    business_id: data?.business_id,
    description: data?.description,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(editValidationSchema)}
      >
        <EditForm detail={data} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
