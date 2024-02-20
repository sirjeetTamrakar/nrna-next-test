import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createQuestion } from "../redux/actions";
import QuestionForm from "./Form";
import { validationSchema } from "./ValidationSchema";
import { useStyles } from "./styles";

const Register = ({ handleClose, surveyId }) => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const classes = useStyles();
  const { create_question_loading } = useSelector((state) => state.question);

  const onSubmit = (data) => {
    const newData = {
      ...data,
      survey_id: surveyId,
      options: data?.options?.filter((item) => item),
    };
    dispatch(createQuestion(newData, handleClose));
  };

  return (
    <>
      <CustomFormProvider
        defaultValues={defaultValues}
        resolver={useYupValidationResolver(validationSchema)}
      >
        <CustomForm onSubmit={onSubmit}>
          <QuestionForm />
          <Box className={classes.footerRoot}>
            <CustomButton
              buttonName="Create Question"
              loading={create_question_loading}
            />
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default Register;
