import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestion } from "../redux/actions";
import QuestionForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const EditForm = ({ handleClose, id, surveyId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { update_question_loading } = useSelector((state) => state.question);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      survey_id: surveyId,
      options: data?.options?.filter((item) => item),
    };

    dispatch(updateQuestion(id, newData, handleClose));
  };

  return (
    <CustomForm onSubmit={onSubmit}>
      <QuestionForm />
      <Box className={classes.footerRoot}>
        <CustomButton buttonName="Update" loading={update_question_loading} />
      </Box>
    </CustomForm>
  );
};
const Edit = ({ data, handleClose, surveyId }) => {
  const defaultValues = {
    question: data?.question,
    options: data?.options?.map((item) => item?.option),
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <EditForm handleClose={handleClose} id={data?.id} surveyId={surveyId} />
      </CustomFormProvider>
    </>
  );
};

export default Edit;
