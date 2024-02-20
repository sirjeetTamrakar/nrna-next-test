import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategory } from "../redux/actions";
import { useStyles } from "./styles";

const NewsForm = ({ featureImage }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  // const { categoryData } = useSelector((state) => state.business);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  // const businessCategory = categoryData?.map((item) => ({
  //   label: item?.title,
  //   value: item?.id
  // }));

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        {/* <Grid item sm={12}>
          <CustomAutoComplete
            name="title"
            label="Select parent business category"
            options={businessCategory}
            required
          />
        </Grid> */}
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
