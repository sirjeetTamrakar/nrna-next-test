import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

const SurveyListForm = ({ featureImage }) => {
  const classes = useStyles();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCategory());
  // }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Title" required />
        </Grid>

        <Grid item sm={12}>
          <CustomTextArea rows={8} name="description" label="Description" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SurveyListForm;
