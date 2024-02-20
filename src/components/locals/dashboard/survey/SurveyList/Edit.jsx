import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateSurvey } from "../redux/actions";
import NewsForm from "./Form";
import { editValidationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const EditForm = ({ detail, handleClose }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { update_survey_loading } = useSelector((state) => state.question);

  const onSubmit = (data) => {
    dispatch(
      updateSurvey({ ...data, _method: "PUT" }, detail?.slug, handleClose)
    );
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <NewsForm featureImage={detail?.feature_image} />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_survey_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose }) => {
  const defaultValues = {
    title: data?.title,
    description: data?.description,
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
