import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useDispatch, useSelector } from "react-redux";
import MemberForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { updateBanner } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { update_banner_loading } = useSelector((state) => state.banner);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("title", data?.title);
    formData.append("subtitle", data?.subtitle);
    formData.append("description", data?.description);
    formData.append("link", data?.link ?? "");
    formData.append("status", 1);
    formData.append("_method", "PUT");

    if (user?.role_name === Roles.NCC) {
      formData.append("bannerable_type", "ncc");
      formData.append("bannerable_id", user?.ncc?.id);
      typeData = {
        page: 1,
        pagination_limit: 10,
        bannerable_type: "ncc",
        bannerable_id: user?.ncc?.id,
      };
    }

    if (user?.role_name === Roles.SuperAdmin && admin_role_details === "ncc") {
      formData.append("bannerable_type", "ncc");
      formData.append("bannerable_id", admin_ncc_id_details);
      typeData = {
        page: 1,
        pagination_limit: 10,
        bannerable_type: "ncc",
        bannerable_id: admin_ncc_id_details,
      };
    }

    if (user?.role_name !== Roles.NCC) {
      typeData = {
        page: 1,
        pagination_limit: 10,
      };
    }

    if (data?.image?.length > 0) {
      formData.append("image", data?.image?.[0]);
    }
    dispatch(updateBanner(detail?.id, formData, typeData, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <MemberForm banner_image={detail?.image} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_banner_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    subtitle: data?.subtitle,
    link: data?.link,
    description: data?.link,
    status: data?.status,
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
