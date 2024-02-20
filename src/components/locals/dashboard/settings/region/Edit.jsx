import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RegionForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { updateRegion } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { update_region_loading } = useSelector((state) => state.region);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("name", data?.name);
    formData.append("_method", "PUT");

    if (data?.region_image?.length > 0) {
      formData.append("region_image", data?.region_image?.[0]);
    }
    typeData = {
      page: 1,
      pagination_limit: 10,
    };
    dispatch(updateRegion(detail?.slug, formData, typeData, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <RegionForm region_image={detail?.region_image} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_region_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    name: data?.name,
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
