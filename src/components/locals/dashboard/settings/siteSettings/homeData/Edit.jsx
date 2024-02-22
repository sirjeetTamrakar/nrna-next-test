import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Roles } from "@/constants/RoleConstant";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateHomeData } from "../../redux/actions";
import HomeDataForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { update_home_data_loading } = useSelector((state) => state.settings);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("title", data?.title);
    formData.append("tabtitle", data?.tabtitle);
    formData.append("subtitle", data?.subtitle);
    formData.append("description", data?.description);
    formData.append("tagline", data?.tagline);
    formData.append("tagline_author", data?.tagline_author);
    formData.append("status", 1);
    formData.append("_method", "PUT");

    if (user?.role_name === Roles.NCC) {
      formData.append("homedataable_type", "ncc");
      formData.append("homedataable_id", user?.ncc?.id);
      typeData = {
        page: 1,
        homedataable_type: "ncc",
        homedataable_id: user?.ncc?.id,
      };
    }
    if (
      user?.role_name === Roles.SuperAdmin &&
      admin_ncc_id_details === "ncc"
    ) {
      formData.append("homedataable_type", "ncc");
      formData.append("homedataable_id", admin_ncc_id_details);
      typeData = {
        page: 1,
        homedataable_type: "ncc",
        homedataable_id: admin_ncc_id_details,
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
    if (data?.banner_image?.length > 0) {
      formData.append("banner_image", data?.banner_image?.[0]);
    }
    dispatch(updateHomeData(detail?.id, formData, typeData, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <HomeDataForm banner_image={detail?.banner_image} image={detail?.image} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_home_data_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    subtitle: data?.subtitle,
    description: data?.description,
    tabtitle: data?.tabtitle,
    tagline: data?.tagline,
    tagline_author: data?.tagline_author,
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
