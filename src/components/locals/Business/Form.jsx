import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import {
  getSingleBusiness,
  postBusinessContact,
} from "@/redux/homepage/actions";
import { Box, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useStyles } from "./styles";

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { single_business, business_contact_loading } = useSelector(
    (state) => state.homepage
  );
  const { slug } = useRouter()?.query;
  useEffect(() => {
    slug && dispatch(getSingleBusiness(slug));
  }, [slug]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    email: Yup.string().required("Please enter email"),
    subject: Yup.string().required("Please enter subject"),
    description: Yup.string().required("Please enter description"),
  });

  return (
    <section className="contact_page" id="contact_main">
      {/* <div className="contact_page_title">Contact us</div> */}

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
                    {single_business?.address || ""}
                  </span>
                </li>
                <li>
                  <i className="fa fa-phone"></i>
                  <span className="contact_list_item">
                    {single_business?.phone || ""}
                  </span>
                </li>
                <li>
                  <i className="fa fa-envelope"></i>
                  <span className="contact_list_item">
                    {single_business?.email || ""}
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
                <Box className={classes.contactRoot}>
                  <FormComponent
                    loading={business_contact_loading}
                    single_business={single_business}
                  />
                </Box>
              </CustomFormProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FormComponent = ({ loading, single_business }) => {
  const classes = useStyles();
  const { watch, reset } = useFormContext();

  const dispatch = useDispatch();

  const handleSuccess = () => {
    reset();
  };

  console.log("watch", watch());

  const submitHandler = (data) => {
    console.log({ data });
    dispatch(
      postBusinessContact(
        { ...data, business_id: single_business?.id },
        handleSuccess
      )
    );
  };

  return (
    <CustomForm onSubmit={submitHandler}>
      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
        <Grid item className="col-lg-6">
          <CustomInput
            name="name"
            label="Name"
            placeholder="Guy Hawkins"
            rows={15}
          />
        </Grid>
        <Grid item className="col-lg-6">
          <CustomInput
            name="email"
            label="Email address"
            type="email"
            placeholder="guy.hawkin@gmail.com"
            rows={15}
          />
        </Grid>
        <Grid item className="col-lg-12">
          <CustomInput
            name="subject"
            label="Subject"
            placeholder="Enter Subject"
            rows={15}
          />
        </Grid>
        <Grid item className="col-lg-12">
          <CustomTextArea
            name="description"
            label="Description"
            placeholder="Say something"
            rows={5}
          />
        </Grid>
        <Grid item className="col-lg-12">
          <Box className={classes.footerRoot}>
            <CustomButton buttonName="Submit Form" loading={loading} />
          </Box>
        </Grid>
      </Grid>
    </CustomForm>
  );
};

export default Form;
