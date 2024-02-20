import { Box, Container, Typography } from "@mui/material";
// import { getAllQuestions } from '@/components/locals/dashboard/survey/redux/actions';
import { getAllQuestions } from "@/redux/homepage/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import FormTwo from "./FormTwo";
import useStyles from "./styles";

const SurveyQuestions = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  const validationSchema = Yup.object({
    first_name: Yup.string().required("Please enter first name"),
    last_name: Yup.string().required("Please enter last name"),
    phone: Yup.string().required("Please enter phone").min(10).max(10),
    email: Yup.string().required("Please enter email"),
    country_of_residence: Yup.string().required("Please select a country"),
  });
  return (
    <Container>
      <Box className={classes.surveyQuestionRoot}>
        <Typography
          variant="h2"
          textAlign="center"
          className={classes.surveyPageTitle}
        >
          Exclusive Survey Questions Await Your Input
        </Typography>
        {/* <Form /> */}
        <FormTwo />
      </Box>
    </Container>
  );
};

export default SurveyQuestions;
