import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomEditor from "@/components/common/CustomEditor";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Box, Grid } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postSiteSettings } from "../../redux/actions";
import { useStyles } from "./styles";

const AboutForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultValues = {
    about: "",
    about_title: "",
    about_subtitle: "",
    about_image: "",
    about_tagline: "",
    about_tagline_author: "",
  };
  const { setValue } = useFormContext({ defaultValues });

  const { site_settings, site_settings_loading } = useSelector(
    (state) => state.settings
  );
  const { user, admin_ncc_id_details, admin_role_details } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (site_settings) {
      setValue("about", site_settings?.about);
      setValue("about_title", site_settings?.about_title);
      setValue("about_subtitle", site_settings?.about_subtitle);
      setValue("about_tagline", site_settings?.about_tagline);
      setValue("about_tagline_author", site_settings?.about_tagline_author);
    }
  }, [site_settings]);

  const submitHandler = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("about", data?.about);
    formData.append("about_title", data?.about_title);
    formData.append("about_subtitle", data?.about_subtitle);
    formData.append("about_tagline", data?.about_tagline);
    formData.append("about_tagline_author", data?.about_tagline_author);
    if (user?.role_name === Roles.NCC) {
      formData.append("settingable_type", "ncc");
      formData.append("settingable_id", user?.ncc?.id);
      typeData = { settingable_type: "ncc", settingable_id: user?.ncc?.id };
    }
    if (user?.role_name === Roles.SuperAdmin && admin_role_details === "ncc") {
      formData.append("settingable_type", "ncc");
      formData.append("settingable_id", admin_ncc_id_details);
      typeData = {
        settingable_type: "ncc",
        settingable_id: admin_ncc_id_details,
      };
    }
    if (data?.about_image?.length > 0) {
      formData.append("about_image", data?.about_image?.[0]);
    }
    if (data?.about_banner?.length > 0) {
      formData.append("about_banner", data?.about_banner?.[0]);
    }
    dispatch(postSiteSettings(formData, typeData));
  };

  return (
    <Box className={classes.root}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FileUploader
              title="About Image"
              imageText="Resolution: height: 525 x width: 500"
              name="about_image"
              label="Select Photo"
              image={site_settings?.about_image}
            />
          </Grid>
          <Grid item sm={12}>
            <FileUploader
              title="About Banner Image"
              imageText="Resolution: height: 1400 x width: 400"
              name="about_banner"
              label="Select Photo"
              image={site_settings?.about_banner}
              widthFull
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="about_title" label="About Title" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="about_subtitle"
              label="About Subtitle"
              required
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="about_tagline_author"
              label="Tagline author"
              required
            />
          </Grid>
          <Grid item sm={12}>
            <CustomTextArea name="about_tagline" label="Tagline" required />
          </Grid>
          <Grid item sm={12}>
            {/* <CustomTextArea name="about" label="About Description" required rows={15} /> */}
            <CustomEditor name="about" />
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

export default AboutForm;
