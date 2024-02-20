import CustomEditor from "@/components/common/CustomEditor";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from '../userManagement/redux/actions';
// import { getCategory } from './redux/actions';
import { useStyles } from "./styles";

const Form = ({ featureImage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Title" required />
        </Grid>

        <Grid item sm={12}>
          <FileUploader
            title="News Image"
            imageText="Resolution: height: 1024 x width: 768"
            name="pressReleaseImage"
            image={featureImage}
            label="Select Photo"
            widthFull
          />
        </Grid>
        <Grid item sm={12}>
          <CustomTextArea rows={8} name="excerpt" label="Excerpt" />
        </Grid>
        <Grid item sm={12}>
          <CustomEditor name="description" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
