import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from '../userManagement/redux/actions';
// import { getCategory } from './redux/actions';
import { useStyles } from "./styles";

const GalleryForm = ({ featureImage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getAllUsers());
  // }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="title" label="Image Title" required />
        </Grid>
        <Grid item sm={12}>
          <FileUploader
            title="Gallery Image"
            imageText="Resolution: height: 1024 x width: 768"
            name="gallery_image"
            image={featureImage}
            label="Select Photo"
            widthFull
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default GalleryForm;
