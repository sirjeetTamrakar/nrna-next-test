import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { postBusinessService } from "../redux/actions";
import ServiceForm from "./ServiceForm";
import { serviceValidationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Form = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { business_service_loading } = useSelector((state) => state.business);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    // formData.append('status', data?.status);
    // formData.append('created_by', data?.created_by);
    // formData.append('status', 'active');
    // formData.append('_method', 'PUT');
    formData.append("business_id", detail?.id);
    if (data?.service_image?.length > 0) {
      formData.append("service_image", data?.service_image?.[0]);
    }
    dispatch(postBusinessService(formData, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      {/* {[...Array(3).keys()]?.map((index) => ( */}
      <ServiceForm featureImage={detail?.service_image} />
      {/* ))} */}
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Submit" loading={business_service_loading} />
      </Box>
    </CustomForm>
  );
};
const Service = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    // created_by: data?.created_by?.id,
    // description: data?.description
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(serviceValidationSchema)}
      >
        <Form detail={data} handleClose={handleClose} />
      </CustomFormProvider>
    </>
  );
};

export default Service;
