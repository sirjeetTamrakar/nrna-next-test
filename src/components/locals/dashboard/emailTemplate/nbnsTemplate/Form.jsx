import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomEditor from "@/components/common/CustomEditor";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postEmailTemplate } from "../redux/actions";
import { useStyles } from "./styles";

const NBNSTemplateForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const defaultValues = {
    title: "",
    description: "",
  };
  const { setValue } = useFormContext({ defaultValues });

  const { email_templateData, email_template_loading } = useSelector(
    (state) => state.emailTemplate
  );

  useEffect(() => {
    if (email_templateData?.data?.[0]) {
      setValue("title", email_templateData?.data?.[0]?.title);
      setValue("description", email_templateData?.data?.[0]?.description);
    }
  }, [email_templateData?.data?.[0]]);

  const submitHandler = (data) => {
    const formData = new FormData();

    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("nbns", "nbns");

    dispatch(postEmailTemplate(formData));
  };
  return (
    <Box className={classes.root}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <CustomInput name="title" label="Email template title" required />
          </Grid>

          <Grid item sm={12}>
            {/* <CustomTextArea name="description" label="Description" /> */}
            <CustomEditor emailTemplate={"Email Template"} name="description" />
          </Grid>
        </Grid>
        <Grid item sm={12}>
          <Box className={classes.footerRoot}>
            <CustomButton
              buttonName="Submit"
              loading={email_template_loading}
            />
          </Box>
        </Grid>
      </CustomForm>
    </Box>
  );
};

export default NBNSTemplateForm;
