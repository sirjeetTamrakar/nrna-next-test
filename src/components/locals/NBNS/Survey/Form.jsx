import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import { postQuestionFront } from "@/components/locals/dashboard/survey/redux/actions";
import { Box, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { questions } = useSelector((state) => state.question);

  const onSubmit = (data) => {
    dispatch(postQuestionFront());
  };

  const { register } = useFormContext();

  return (
    <CustomForm onSubmit={onSubmit}>
      <Box className={classes.questionSection}>
        {questions?.map((item, index) => {
          return (
            <Box className={classes.questionWrapper} key={index}>
              <Typography variant="h6" className={classes.question}>
                {index + 1}. {item?.question} ?
              </Typography>
              <ul className={classes.answerWrapper}>
                {item?.options?.map((item, index) => {
                  return (
                    <li key={index}>
                      <input
                        type="radio"
                        value={1}
                        id={item?.id}
                        {...register(`name${index}`)}
                      />
                      <label htmlFor={"1" + index}> {item?.option}</label>
                    </li>
                  );
                })}
              </ul>
            </Box>
          );
        })}
        {/* {[...Array(10)?.keys()]?.map((question, index) => (
          <Box className={classes.questionWrapper} key={index}>
            <Typography variant="h6" className={classes.question}>
              {index + 1}. How often do you exercise?
            </Typography>
            <ul className={classes.answerWrapper}>
              <li>
                <input type="radio" value={1} id={'a' + index} {...register(`name${index}`)} />
                <label htmlFor={'a' + index}> Rarely or never</label>
              </li>
              <li>
                <input type="radio" value={1} id={'b' + index} {...register(`name${index}`)} />
                <label htmlFor={'b' + index}> 1-2 times a week </label>
              </li>
              <li>
                <input type="radio" value={1} id={'c' + index} {...register(`name${index}`)} />
                <label htmlFor={'c' + index}> 3-4 times a week</label>
              </li>
              <li>
                <input type="radio" value={1} id={'d' + index} {...register(`name${index}`)} />
                <label htmlFor={'d' + index}>5 or more times a week</label>
              </li>
            </ul>
          </Box>
        ))} */}
        <Box marginTop={8}>
          <CustomButton
            justifyContent="center"
            variant="contained"
            type="submit"
            buttonName="Submit your survey"
          />
        </Box>
      </Box>
    </CustomForm>
  );
};

export default Form;
