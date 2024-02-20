import CustomEditor from "@/components/common/CustomEditor";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

const BannerForm = ({ banner_image }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Banner Title" required />
        </Grid>
        <Grid item sm={12}>
          <CustomInput name="subtitle" label="Subtitle" required />
        </Grid>
        <Grid item sm={12}>
          <CustomInput name="link" label="Link" required />
        </Grid>
        <Grid item sm={12}>
          <FileUploader
            title="Banner Image"
            name="image"
            label="Select Photo"
            widthFull
            image={banner_image}
          />
        </Grid>
        <Grid item sm={12}>
          {/* <CustomTextArea name="description" label="Description" /> */}
          <CustomEditor name="description" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BannerForm;
