import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import RegionForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postRegion } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();

  const { region_loading } = useSelector((state) => state.region);
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("name", data?.name);

    typeData = {
      page: 1,
      pagination_limit: 10,
    };

    if (data?.region_image?.length > 0) {
      formData.append("region_image", data?.region_image?.[0]);
    }
    dispatch(postRegion(formData, typeData, handleClose));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <RegionForm />
          <Box className={classes.footerRoot}>
            <CustomButton buttonName="Create Region" loading={region_loading} />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
