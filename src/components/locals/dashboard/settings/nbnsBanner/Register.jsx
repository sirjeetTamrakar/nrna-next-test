import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BannerForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { postNBNSBanner } from "./redux/actions";
import { useStyles } from "./styles";

const Register = ({ handleClose }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();

  const { banner_loading } = useSelector((state) => state.nbnsBanner);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("subtitle", data?.subtitle ?? "");
    formData.append("description", data?.description ?? "");
    formData.append("link", data?.link ?? "");
    formData.append("status", 1);
    formData.append("bannerable_type", "nbns");
    formData.append("bannerable_id", 1);

    if (data?.image?.length > 0) {
      formData.append("image", data?.image?.[0]);
    }
    dispatch(
      postNBNSBanner(
        formData,
        { bannerable_type: "nbns", bannerable_id: 1 },
        handleClose
      )
    );
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <BannerForm />
          <Box className={classes.footerRoot}>
            <CustomButton buttonName="Create Banner" loading={banner_loading} />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
