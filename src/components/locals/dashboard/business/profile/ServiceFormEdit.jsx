import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateBusinessService } from "../redux/actions";
import ServiceForm from "./ServiceForm";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { update_business_service_loading } = useSelector(
    (state) => state.business
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    // formData.append('status', data?.status);
    // formData.append('created_by', data?.created_by);
    // formData.append('status', 'active');
    formData.append("_method", "PUT");
    formData.append("business_id", detail?.id);
    if (data?.service_image?.length > 0) {
      formData.append("service_image", data?.service_image?.[0]);
    }
    dispatch(updateBusinessService(formData, detail?.slug, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <ServiceForm serviceImage={detail?.service_image} />
      <Box className={classes.footerRoot}>
        <CustomButton
          buttonName="Update"
          loading={update_business_service_loading}
        />
      </Box>
    </CustomForm>
  );
};
const ServiceFormEdit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,

    description: data?.description,
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        // resolver={useYupValidationResolver(editValidationSchema)}
      >
        <EditForm detail={data} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default ServiceFormEdit;
