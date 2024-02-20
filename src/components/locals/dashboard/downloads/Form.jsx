import CustomEditor from "@/components/common/CustomEditor";
import CustomInput from "@/components/common/Form/CustomInput";
import PDFFileUploader from "@/components/common/Form/CustomPDFUpload";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../userManagement/redux/actions";
import { useStyles } from "./styles";

const NewsForm = ({ featureImage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Title" required />
        </Grid>
        <Grid item sm={12}>
          <CustomEditor name="description" />
        </Grid>
        <Grid item sm={12}>
          <PDFFileUploader
            title="PDF File"
            name="file"
            image={featureImage}
            label="Select PDF"
            widthFull
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsForm;
