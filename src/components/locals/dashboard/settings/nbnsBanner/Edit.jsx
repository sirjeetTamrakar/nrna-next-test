import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MemberForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { updateNBNSBanner } from "./redux/actions";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { update_banner_loading } = useSelector((state) => state.nbnsBanner);
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("subtitle", data?.subtitle);
    formData.append("description", data?.description);
    formData.append("link", data?.link ?? "");
    formData.append("status", 1);
    formData.append("bannerable_type", "nbns");
    formData.append("bannerable_id", 1);
    formData.append("_method", "PUT");

    if (data?.image?.length > 0) {
      formData.append("image", data?.image?.[0]);
    }
    dispatch(
      updateNBNSBanner(
        detail?.id,
        formData,
        { bannerable_type: "nbns", bannerable_id: 1 },
        handleClose
      )
    );
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
    title: data?.title ?? "",
    subtitle: data?.subtitle ?? "",
    link: data?.link ?? "",
    description: data?.link ?? "",
    status: data?.status ?? "",
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
