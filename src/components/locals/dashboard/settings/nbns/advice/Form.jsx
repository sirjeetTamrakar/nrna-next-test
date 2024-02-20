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

const AdviceForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultValues = {
    advice_title: "",
    advice_subtitle: "",
    advice_banner: "",
  };
  const { setValue } = useFormContext({ defaultValues });

  const { site_settings, site_settings_loading } = useSelector(
    (state) => state.settings
  );

  useEffect(() => {
    if (site_settings) {
      setValue("advice_title", site_settings?.advice_title);
      setValue("survey_subtitle", site_settings?.survey_subtitle);
    }
  }, [site_settings]);

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("advice_title", data?.advice_title);
    formData.append("advice_subtitle", data?.advice_subtitle);
    formData.append("settingable_type", "nbns");
    formData.append("settingable_id", 1);
    if (data?.advice_banner?.length > 0) {
      formData.append("advice_banner", data?.advice_banner?.[0]);
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
              title="Advice Banner"
              imageText="Resolution: height: 1400 x width: 400"
              name="advice_banner"
              label="Select Photo"
              image={site_settings?.advice_banner}
              widthFull
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="advice_title" label="Advice Title" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="advice_subtitle"
              label="Advice Subtitle"
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

export default AdviceForm;
