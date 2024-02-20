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
    ncc_banner_subtitle: "",
    ncc_banner_title: "",
    ncc_title: "",
    ncc_description: "",
    ncc_banner_image: "",
  };
  const { setValue } = useFormContext({ defaultValues });

  const { site_settings, site_settings_loading } = useSelector(
    (state) => state.settings
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (site_settings) {
      setValue("ncc_title", site_settings?.ncc_title);
      setValue("ncc_banner_title", site_settings?.ncc_banner_title);
      setValue("ncc_banner_subtitle", site_settings?.ncc_banner_subtitle);
      setValue("ncc_description", site_settings?.ncc_description);
    }
  }, [site_settings]);

  const submitHandler = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("ncc_title", data?.ncc_title);
    formData.append("ncc_banner_title", data?.ncc_banner_title);
    formData.append("ncc_banner_subtitle", data?.ncc_banner_subtitle);
    formData.append("ncc_description", data?.ncc_description);
    // if (user?.role_name == Roles.NCC) {
    //   formData.append('settingable_type', 'ncc');
    //   formData.append('settingable_id', user?.ncc?.id);
    //   typeData = { settingable_type: 'ncc', settingable_id: user?.ncc?.id };
    // }

    if (data?.ncc_banner_image?.length > 0) {
      formData.append("ncc_banner_image", data?.ncc_banner_image?.[0]);
    }

    dispatch(postSiteSettings(formData, typeData));
  };
  return (
    <Box className={classes.root}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FileUploader
              title="NCC banner Logo"
              name="ncc_banner_image"
              label="Select Photo"
              image={site_settings?.ncc_banner_image}
              widthFull
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="ncc_title" label="Title" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="ncc_banner_title"
              label="Banner title"
              required
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="ncc_banner_subtitle"
              label="Banner subtitle"
              required
            />
          </Grid>

          <Grid item sm={12}>
            <CustomEditor name="ncc_description" />
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
