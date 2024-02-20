import CustomButton from "@/components/common/CustomButton/CustomButton";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { Roles } from "constants/RoleConstant";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postSiteSettings } from "../../redux/actions";
import { useStyles } from "./styles";

const ContactForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultValues = {
    contact_title: "",
    contact_subtitle: "",
    contact_image: "",
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
      setValue("contact_title", site_settings?.contact_title);
      setValue("contact_subtitle", site_settings?.contact_subtitle);
    }
  }, [site_settings]);

  const submitHandler = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("contact_title", data?.contact_title);
    formData.append("contact_subtitle", data?.contact_subtitle);
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
    if (data?.contact_banner_image?.length > 0) {
      formData.append("contact_banner_image", data?.contact_banner_image?.[0]);
    }
    dispatch(postSiteSettings(formData, typeData));
  };

  return (
    <Box className={classes.root}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <FileUploader
              title="Contact Banner Image"
              imageText="Resolution: height: 1400 x width: 400"
              name="contact_banner_image"
              label="Select Photo"
              image={site_settings?.contact_banner_image}
              widthFull
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="contact_title" label="Contact Title" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              name="contact_subtitle"
              label="Contact Subtitle"
              required
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

export default ContactForm;
