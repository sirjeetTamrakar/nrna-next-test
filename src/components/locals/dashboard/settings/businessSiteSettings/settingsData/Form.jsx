import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomEditor from "@/components/common/CustomEditor";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postSiteSettings } from "../../redux/actions";
import { useStyles } from "./styles";

const SettingsDataForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultValues = {
    business_banner_subtitle: "",
    business_banner_title: "",
    business_title: "",
    business_description: "",
    business_banner_image: "",
  };
  const { setValue } = useFormContext({ defaultValues });

  const { site_settings, site_settings_loading } = useSelector(
    (state) => state.settings
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (site_settings) {
      setValue("business_title", site_settings?.business_title);
      setValue("business_banner_title", site_settings?.business_banner_title);
      setValue(
        "business_banner_subtitle",
        site_settings?.business_banner_subtitle
      );
      setValue("business_description", site_settings?.business_description);
    }
  }, [site_settings]);

  const submitHandler = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("business_title", data?.business_title);
    formData.append("business_banner_title", data?.business_banner_title);
    formData.append("business_banner_subtitle", data?.business_banner_subtitle);
    formData.append("business_description", data?.business_description);
    // if (user?.role_name == Roles.NCC) {
    //   formData.append('settingable_type', 'ncc');
    //   formData.append('settingable_id', user?.ncc?.id);
    //   typeData = { settingable_type: 'ncc', settingable_id: user?.ncc?.id };
    // }

    if (data?.business_banner_image?.length > 0) {
      formData.append(
        "business_banner_image",
        data?.business_banner_image?.[0]
      );
    }

    dispatch(postSiteSettings(formData, typeData));
  };
  return (
    <Box className={classes.root}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FileUploader
              title="Site Logo"
              name="business_banner_image"
              label="Select Photo"
              image={site_settings?.business_banner_image}
              widthFull
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="business_title" label="Title" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="business_banner_title"
              label="Banner title"
              required
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="business_banner_subtitle"
              label="Banner subtitle"
              required
            />
          </Grid>

          <Grid item sm={12}>
            <CustomEditor name="business_description" />
          </Grid>

          <Grid item sm={12}>
            <Box className={classes.footerRoot}>
              <CustomButton
                buttonName="Submit"
                loading={site_settings_loading}
              />
            </Box>
          </Grid>
        </Grid>
      </CustomForm>
    </Box>
  );
};

export default SettingsDataForm;
