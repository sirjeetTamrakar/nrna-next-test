import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomEditor from "@/components/common/CustomEditor";
import { CustomSwitch } from "@/components/common/CustomSwitch/CustomSwitch";
import FileUploader from "@/components/common/Form/CustomFileUpload";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import { Roles } from "@/constants/RoleConstant";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postSiteSettings } from "../../redux/actions";
import { useStyles } from "./styles";

const SettingsDataForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const defaultValues = {
    address: "",
    phone: "",
    email: "",
    tagline_author: "",
    tagline_description: "",
    region_logo: "",
    show_candidate: "",
    privacy_policy: "",
    termsAndConditions: "",
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
      setValue("address", site_settings?.address);
      setValue("email", site_settings?.email);
      setValue("phone", site_settings?.phone);
      setValue("tagline_author", site_settings?.tagline_author);
      setValue("tagline_description", site_settings?.tagline_description);
      setValue("termsAndConditions", site_settings?.termsAndConditions);
      setValue("privacy_policy", site_settings?.privacy_policy);
      setValue(
        "show_candidate",
        site_settings?.show_candidate == "true" && "true"
      );
    }
  }, [site_settings]);

  const submitHandler = (data) => {
    const formData = new FormData();
    let typeData;
    formData.append("address", data?.address);
    formData.append("phone", data?.phone);
    formData.append("email", data?.email);
    formData.append("tagline_author", data?.tagline_author);
    formData.append("tagline_description", data?.tagline_description);
    formData.append("show_candidate", data?.show_candidate);
    formData.append("termsAndConditions", data?.termsAndConditions);
    formData.append("privacy_policy", data?.privacy_policy);
    if (user?.role_name == Roles.NCC) {
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

    if (data?.region_logo?.length > 0) {
      formData.append("region_logo", data?.region_logo?.[0]);
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
              name="region_logo"
              label="Select Photo"
              image={site_settings?.region_logo}
            />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="address" label="Address" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="email" label="Email" type="email" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput name="phone" label="Phone" type="text" required />
          </Grid>
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
              label="Tagline"
              required
              rows={2}
            />
          </Grid>

          {user?.role_name === Roles.SuperAdmin &&
            admin_role_details === "admin" && (
              <>
                <Grid item sm={12}>
                  <CustomEditor
                    emailTemplate={"Terms and Condition"}
                    name="termsAndConditions"
                  />
                </Grid>
                <Grid item sm={12}>
                  <CustomEditor
                    emailTemplate={"Privacy Policy"}
                    name="privacy_policy"
                  />
                </Grid>
              </>
            )}

          <Grid item sm={12}>
            <CustomSwitch
              name="show_candidate"
              label="Show candidates"
              control={control}
              errors={errors}
            />
          </Grid>
          {/* <Grid item sm={12}>
            <CustomCheckBox name="show_candidate" title="Show candidate" />
          </Grid> */}
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
