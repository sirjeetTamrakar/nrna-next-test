import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

const QuestionForm = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput
            name="question"
            label="Question"
            required
            multiline
            rows="3"
          />
        </Grid>
        {[...Array(4)?.keys()]?.map((list) => (
          <Grid item sm={12} key={list}>
            <CustomInput
              name={`options.${list}`}
              label={`Option ${list + 1}`}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuestionForm;
