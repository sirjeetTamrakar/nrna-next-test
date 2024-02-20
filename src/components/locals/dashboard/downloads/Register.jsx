import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useDispatch, useSelector } from "react-redux";
import NewsForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postDownload } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const { user, admin_role_details, admin_ncc_id_details } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const defaultValues = { created_by: user?.id };
  const classes = useStyles();
  const { download_loading } = useSelector((state) => state.download);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("created_by", user?.id);

    if (data?.file?.length > 0) {
      formData.append("file", data?.file?.[0]);
    }
    let typeData;
    if (user?.role_name == Roles?.Member) {
      typeData = {
        type: "member",
        id: user?.id,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
    } else if (user?.role_name == Roles?.NCC) {
      typeData = {
        type: "ncc",
        id: user?.ncc?.id,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
      formData.append("downloadable_type", "ncc");
      formData.append("downloadable_id", user?.ncc?.id);
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "ncc"
    ) {
      typeData = {
        type: "ncc",
        id: admin_ncc_id_details,
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
    } else if (
      user?.role_name == Roles?.SuperAdmin &&
      admin_role_details === "admin"
    ) {
      typeData = {
        page: 1,
        pagination_limit: 10,
        user_id: user?.id,
      };
    }
    dispatch(postDownload(formData, handleClose, typeData));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <NewsForm />
          <Box className={classes.footerRoot}>
            <CustomButton buttonName="Submit" loading={download_loading} />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
