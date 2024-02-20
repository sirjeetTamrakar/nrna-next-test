import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import NCCForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postNCC } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();
  const { ncc_loading, get_countries_list_loading } = useSelector(
    (state) => state.ncc
  );
  const { users_loading } = useSelector((state) => state.user);
  const { get_region_loading } = useSelector((state) => state.region);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("country_name", data?.country_name);
    formData.append("subtitle", data?.subtitle);
    formData.append("admin_id", data?.admin_id);

    let obj = {};
    data?.regions?.forEach((item, index) => {
      const fieldName = `regions[${index}][region_id]`;
      obj[fieldName] = item;
    });

    Object.keys(obj)?.map((key) => {
      formData.append(key, obj?.[key]);
    });

    formData.append("color", data?.color ? data?.color : "#276FC4");
    if (data?.logo?.length > 0) {
      formData.append("logo", data?.logo[0]);
    }

    dispatch(postNCC(formData, handleClose));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <NCCForm />
          {!get_countries_list_loading &&
            !get_region_loading &&
            !users_loading && (
              <Box className={classes.footerRoot}>
                <CustomButton buttonName="Create NCC" loading={ncc_loading} />
              </Box>
            )}
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
