import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postSiteSettings } from "../../redux/actions";
import { useStyles } from "./styles";

const TaglineForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultValues = {
    tagline_author: "",
    tagline_description: "",
  };
  const { setValue } = useFormContext({ defaultValues });

  const { site_settings, site_settings_loading } = useSelector(
    (state) => state.settings
  );
  const { user } = useSelector((state) => state.auth);

  const submitHandler = (data) => {
    const formData = new FormData();
    formData.append("tagline_author", data?.tagline_author);
    formData.append("tagline_description", data?.tagline_description);
    formData.append("settingable_type", "nbns");
    formData.append("settingable_id", 1);
    dispatch(
      postSiteSettings(formData, {
        settingable_type: "nbns",
        settingable_id: 1,
      })
    );
  };

  useEffect(() => {
    if (site_settings) {
      setValue("tagline_author", site_settings?.tagline_author);
      setValue("tagline_description", site_settings?.tagline_description);
    }
  }, [site_settings]);

  return (
    <Box className={classes.root}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <CustomInput
              name="tagline_author"
              label="Tagline Author"
              required
            />
          </Grid>

          <Grid item sm={12}>
            <CustomTextArea
              name="tagline_description"
              label="Tagline Description"
              required
              rows={2}
            />
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

export default TaglineForm;
