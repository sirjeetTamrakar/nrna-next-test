import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

const NewsForm = ({ featureImage }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Title" required />
        </Grid>

        <Grid item sm={12}>
          <FileUploader
            title="Category Image"
            imageText="Resolution: height: 400 x width: 400"
            name="category_image"
            image={featureImage}
            label="Select Photo"
            widthFull
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsForm;
