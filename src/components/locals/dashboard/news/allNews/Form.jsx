import CustomEditor from "@/components/common/CustomEditor";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../userManagement/redux/actions";
import { getCategory } from "../redux/actions";
// import { getAllUsers } from '../userManagement/redux/actions';
// import { getCategory } from './redux/actions';
import { useStyles } from "./styles";

const NewsForm = ({ featureImage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { categoryData } = useSelector((state) => state.news);

  const createdByUsers = users?.data?.map((item) => ({
    label: item?.full_name ? item?.full_name : item?.username,
    value: item?.id,
  }));

  const newsCategory = categoryData?.map((item) => ({
    label: item?.title,
    value: item?.id,
  }));

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllUsers());
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <CustomInput name="title" label="Title" required />
        </Grid>
        <Grid item sm={6}>
          <CustomAutoComplete
            placeholder="News Category"
            name="news_category_id"
            label="News Category"
            options={newsCategory ?? []}
            required
          />
        </Grid>

        <Grid item sm={12}>
          <FileUploader
            title="News Image"
            imageText="Resolution: height: 1024 x width: 768"
            name="feature_image"
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

        <Grid item sm={12}>
          <CustomInput name="author" label="Author" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewsForm;
