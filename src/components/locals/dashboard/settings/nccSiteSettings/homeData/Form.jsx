import CustomEditor from "@/components/common/CustomEditor";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

const HomeDataForm = ({ banner_image, image }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <FileUploader
            title="Image"
            name="image"
            label="Select Photo"
            widthFull
            image={image}
          />
        </Grid>
        <Grid item sm={8}>
          <FileUploader
            title="Banner Image"
            name="banner_image"
            label="Select Photo"
            widthFull
            image={banner_image}
          />
        </Grid>
        <Grid item sm={12}>
          <CustomInput name="tabtitle" label="Tab Title" required />
        </Grid>
        <Grid item sm={12}>
          <CustomInput name="title" label="Title" required />
        </Grid>
        <Grid item sm={12}>
          <CustomInput name="subtitle" label="Subtitle" required />
        </Grid>
        <Grid item sm={12}>
          <CustomInput name="tagline_author" label="Tagline author" />
        </Grid>
        <Grid item sm={12}>
          <CustomTextArea name="tagline" label="Tagline" />
        </Grid>
        <Grid item sm={12}>
          {/* <CustomTextArea name="description" label="Description" /> */}
          <CustomEditor name="description" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeDataForm;
