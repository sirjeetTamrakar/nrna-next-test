import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useDispatch, useSelector } from "react-redux";
import { postHomeData } from "../../redux/actions";
import HomeDataForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();

  const { home_data_loading } = useSelector((state) => state.settings);
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

    if (user?.role_name === Roles.NCC) {
      formData.append("homedataable_type", "ncc");
      formData.append("homedataable_id", user?.ncc?.id);
      typeData = {
        page: 1,
        homedataable_type: "ncc",
        homedataable_id: user?.ncc?.id,
      };
    }
    if (user?.role_name === Roles.SuperAdmin && admin_role_details === "ncc") {
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
    dispatch(postHomeData(formData, typeData, handleClose));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <HomeDataForm />
          <Box className={classes.footerRoot}>
            <CustomButton
              buttonName="Create Home data"
              loading={home_data_loading}
            />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
