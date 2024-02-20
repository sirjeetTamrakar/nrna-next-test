import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import { getCountries } from "@/components/locals/dashboard/ncc/redux/actions";
import { postQuestionFront } from "@/components/locals/dashboard/survey/redux/actions";
import { updateSurveyTaken } from "@/redux/auth/actions";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useStyles from "./styles";

const FormTwo = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const { post_question_front_loading } = useSelector(
    (state) => state.question
  );
  const { questions, details } = useSelector((state) => state.homepage);
  const [answers, setAnswers] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const handleOptionChange = (questionId, selectedOptionId) => {
    const updatedAnswers = answers.filter(
      (answer) => answer.questionId !== questionId
    );
    updatedAnswers.push({ questionId, selectedOptionId });
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    if (questions) {
      const newArray = questions?.filter(
        (item) => Number(item?.survey_id) === details?.survey_id
      );
      setFilteredQuestions(newArray);
    }
  }, [questions]);

  const handleSuccess = () => {
    navigate("/nbns/survey");
    dispatch(updateSurveyTaken());
  };
  const onSubmit = (data) => {
    const finalData = {
      ...details,
      question_answers: answers.map((answer) => ({
        question_id: answer.questionId,
        option_id: answer.selectedOptionId,
      })),
    };
    dispatch(postQuestionFront(finalData, handleSuccess));
  };

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <>
      <CustomFormProvider>
        <CustomForm onSubmit={onSubmit}>
          <Box className={classes.questionSection}>
            {filteredQuestions.map((questionData, index) => (
              <Box className={classes.questionWrapper} key={index}>
                <Typography variant="h6" className={classes.question}>
                  {index + 1}. {questionData?.question} ?
                </Typography>
                <ul className={classes.answerWrapper}>
                  {questionData.options.map((option) => (
                    <li key={option.id}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        id={option?.id}
                        value={option.id}
                        onChange={() =>
                          handleOptionChange(questionData.id, option.id)
                        }
                        checked={
                          answers.find(
                            (answer) => answer.questionId === questionData.id
                          )?.selectedOptionId === option.id
                        }
                      />
                      <label htmlFor={option?.id}> {option?.option}</label>
                    </li>
                  ))}
                </ul>
              </Box>
            ))}

            <Box marginTop={8}>
              <CustomButton
                justifyContent="center"
                variant="contained"
                type="submit"
                buttonName="Submit"
                loading={post_question_front_loading}
              />
            </Box>
            {/* <Button type="submit">Submit</Button> */}
          </Box>
        </CustomForm>
      </CustomFormProvider>
    </>
  );
};

export default FormTwo;
