import CustomEditor from "@/components/common/CustomEditor";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../redux/actions";
import { useStyles } from "./styles";

const ProfileForm = ({ profileImage, bannerImage }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { categoryData } = useSelector((state) => state.business);
  const { countries_list } = useSelector((state) => state.ncc);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  const businessCategory = categoryData?.map((item) => ({
    label: item?.title,
    value: item?.id,
  }));

  const countryList = countries_list?.map((item, index) => ({
    label: item,
    value: item,
  }));

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <FileUploader
            title="Profile image"
            name="profile_image"
            label="Select Photo"
            widthFull
            image={profileImage}
          />
        </Grid>
        <Grid item sm={8}>
          <FileUploader
            title="Profile banner image"
            name="banner_image"
            label="Select Photo"
            widthFull
            image={bannerImage}
          />
        </Grid>
        <Grid item sm={4}>
          <CustomInput name="fullname" label="Fullname" required />
        </Grid>
        <Grid item sm={4}>
          <CustomInput name="email" label="Email" type="email" required />
        </Grid>
        <Grid item sm={4}>
          <CustomInput name="phone" label="Phone" required />
        </Grid>
        <Grid item sm={4}>
          <CustomInput name="address" label="Address" required />
        </Grid>
        <Grid item sm={8}>
          <CustomInput
            name="google_map_link"
            label="Google Map Link"
            required
          />
        </Grid>
        <Grid item sm={4}>
          <CustomInput name="facebook_url" label="Facebook url" required />
        </Grid>
        <Grid item sm={4}>
          <CustomInput name="instagram_url" label="Instagram url" required />
        </Grid>
        <Grid item sm={4}>
          <CustomInput name="twitter_url" label="Twitter url" required />
        </Grid>
        <Grid item sm={6}>
          <CustomAutoComplete
            name="business_category_id"
            label="Select business category"
            options={businessCategory ?? []}
            required
          />
        </Grid>
        <Grid item sm={6}>
          <CustomAutoComplete
            name="country"
            label="Select country of residence"
            options={countryList ?? []}
            required
          />
        </Grid>
        <Grid item sm={12}>
          <CustomEditor name="description" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
