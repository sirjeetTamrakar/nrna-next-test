import CustomButton from "@/components/common/CustomButton/CustomButton";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postSiteSettings } from "../../redux/actions";
import { useStyles } from "./styles";

const SupportForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultValues = {
    support_title: "",
    support_subtitle: "",
    support_banner: "",
  };
  const { setValue } = useFormContext({ defaultValues });

  const { site_settings, site_settings_loading } = useSelector(
    (state) => state.settings
  );

  useEffect(() => {
    if (site_settings) {
      setValue("support_title", site_settings?.support_title);
      setValue("support_subtitle", site_settings?.support_subtitle);
    }
  }, [site_settings]);

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("support_title", data?.support_title);
    formData.append("support_subtitle", data?.support_subtitle);
    formData.append("settingable_type", "nbns");
    formData.append("settingable_id", 1);
    if (data?.support_banner?.length > 0) {
      formData.append("support_banner", data?.support_banner?.[0]);
    }
    dispatch(
      postSiteSettings(formData, {
        settingable_type: "nbns",
        settingable_id: 1,
      })
    );
  };

  return (
    <Box className={classes.root}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FileUploader
              title="Support Banner"
              imageText="Resolution: height: 1400 x width: 400"
              name="support_banner"
              label="Select Photo"
              image={site_settings?.support_banner}
              widthFull
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="support_title" label="Support Title" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="support_subtitle"
              label="Support Subtitle"
              required
            />
          </Grid>
          <Grid item sm={12}>
            <Box className={classes.footerRoot}>
              <CustomButton
                loading={site_settings_loading}
                buttonName="Submit"
              />
            </Box>
          </Grid>
        </Grid>
      </CustomForm>
    </Box>
  );
};

export default SupportForm;
