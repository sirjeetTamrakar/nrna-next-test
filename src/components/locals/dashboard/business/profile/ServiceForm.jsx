import CustomEditor from "@/components/common/CustomEditor";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

const ServiceForm = ({ serviceImage }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <FileUploader
            title="Service Image"
            name="service_image"
            label="Select Photo"
            widthFull
            image={serviceImage}
          />
        </Grid>

        <Grid item sm={8}>
          <CustomInput name="title" label="Service Title" required />
          <Box marginTop={3}>
            {/* <CustomTextArea name="description" label="Service Description" rows={10} required /> */}
            <CustomEditor name="description" label="Service Description" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceForm;
