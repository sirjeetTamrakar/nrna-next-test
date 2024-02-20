import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { getSingleUser, teamsContactUs } from "@/redux/homepage/actions";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useStyles } from "./styles";

const Contact = () => {
  const { single_user, teams_contact_loading } = useSelector(
    (state) => state.homepage
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    email: Yup.string().required("Please enter email"),
    phone: Yup.string().required("Please enter phone number").min(10).max(10),
    message: Yup.string().required("Please enter message"),
  });

  return (
    <section className="contact_page" id="contact_main">
      <div className="container">
        <div className="row">
          <div className="col-md-3 offset-md-1">
            <div className="contact_content">
              <div className="contact_content_title">Contact Information</div>
              <div className="contact_content_subtitle">
                Fill up the form to get in touch with the NBNS Global team.
              </div>
              <ul className="contact_list">
                <li>
                  <i className="fa fa-map-marker-alt"></i>
                  <span className="contact_list_item">
                    {single_user?.address || ""}
                  </span>
                </li>
                <li>
                  <i className="fa fa-phone"></i>
                  <span className="contact_list_item">
                    {single_user?.phone || ""}
                  </span>
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  <span className="contact_list_item">
                    {single_user?.email || ""}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="contact_form" style={{ paddingTop: "-20px" }}>
              <CustomFormProvider
                resolver={useYupValidationResolver(validationSchema)}
              >
                <FormComponent
                  singleUser={single_user}
                  loading={teams_contact_loading}
                />
              </CustomFormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormComponent = ({ singleUser, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { candidate } = useParams();
  useEffect(() => {
    dispatch(getSingleUser(candidate));
  }, [candidate]);
  const { reset } = useFormContext({});

  const handleSuccess = () => {
    reset({});
  };

  const submitHandler = (data) => {
    dispatch(
      teamsContactUs({ ...data, user_id: singleUser?.id }, handleSuccess)
    );
  };

  return (
    <Box className={classes.contactRoot}>
      <CustomForm onSubmit={submitHandler}>
        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid item className="col-md-12" style={{ paddingRight: "0px" }}>
            <CustomInput
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
          </Grid>
          <Grid
            item
            className="col-md-12 col-lg-6"
            style={{ paddingRight: "0px" }}
          >
            <CustomInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
          </Grid>
          <Grid
            item
            className="col-md-12 col-lg-6"
            style={{ paddingRight: "0px" }}
          >
            <CustomInput
              name="phone"
              type="text"
              label="Phone"
              placeholder="Enter your phone"
            />
          </Grid>
          <Grid item className="col-md-12" style={{ paddingRight: "0px" }}>
            <CustomTextArea
              name="message"
              label="Description"
              placeholder="Write some message"
              rows={5}
            />
          </Grid>
          <Grid item className="col-md-12">
            <Box className={classes.footerRoot}>
              <CustomButton buttonName="Submit Form" loading={loading} />
            </Box>
          </Grid>
        </Grid>
      </CustomForm>
    </Box>
  );
};

export default Contact;
