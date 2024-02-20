import CustomEditor from "@/components/common/CustomEditor";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Box, Grid } from "@mui/material";

import { useStyles } from "./styles";

const Form = ({ featureImage }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Title" required />
        </Grid>

        <Grid item sm={12}>
          <FileUploader
            title="Article Image"
            imageText="Resolution: height: 1024 x width: 768"
            name="articleImage"
            image={featureImage}
            label="Select Photo"
            widthFull
          />
        </Grid>
        <Grid item sm={12}>
          <CustomTextArea rows={8} name="excerpt" label="Excerpt" />
        </Grid>
        <Grid item sm={12}>
          <Box>
            <CustomEditor name="description" />
          </Box>
        </Grid>
        <Grid item sm={12}>
          <CustomInput name="author" label="Author" required />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;
