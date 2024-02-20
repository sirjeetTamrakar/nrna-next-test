import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useStyles } from "./styles";

const RegionForm = ({ region_image }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="name" label="Region Title" required />
        </Grid>

        <Grid item sm={12}>
          <FileUploader
            title="Region Image"
            name="region_image"
            label="Select Photo"
            widthFull
            image={region_image}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegionForm;
