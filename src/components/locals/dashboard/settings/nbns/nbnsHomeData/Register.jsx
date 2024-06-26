import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postHomeData } from "../../redux/actions";
import NbnsHomeDataForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();

  const { home_data_loading } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.auth);

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

    // if (user?.role_name === Roles.NCC) {
    formData.append("homedataable_type", "nbns");
    formData.append("homedataable_id", 1);
    typeData = {
      page: 1,
      pagination_limit: 10,
      homedataable_type: "nbns",
      homedataable_id: 1,
    };
    // }

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
          <NbnsHomeDataForm />
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
