import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomTextArea from "@/components/common/Form/CustomTextarea";
import PageBanner from "@/components/globals/PageBanner";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { contactUs, getSingleNCC } from "@/redux/homepage/actions";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Contact = ({ siteSettings, handleSubmit }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    email: Yup.string().required("Please enter email"),
    phone: Yup.string().required("Please enter phone").min(10).max(10),
    subject: Yup.string().required("Please enter subject"),
    message: Yup.string().required("Please enter description"),
  });

  const { single_ncc, contact_loading } = useSelector(
    (state) => state.homepage
  );
  const { setValue } = useForm({});
  const { ncc } = useRouter()?.query;
  useEffect(() => {
    ncc && dispatch(getSingleNCC(ncc));
  }, [ncc]);
  const handleSuccess = () => {
    const array = ["name", "email", "phone", "message"];
    array?.map((item) => setValue(item, ""));
  };

  const submitHandler = (data) => {
    dispatch(
      contactUs(
        { ...data, contactable_type: "ncc", contactable_id: single_ncc?.id },
        handleSuccess
      )
    );
  };

  const { settings } = useSelector((state) => state.homepage);

  return (
    <>
      <PageBanner
        title={settings?.contact_title}
        subtitle={settings?.contact_subtitle}
        image={settings?.contact_banner_image}
      />
      <section
        className="contact_page"
        id="contact_main"
        style={{ background: "#e5e5e58f" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-3 offset-md-1">
              <div className="contact_content">
                <div className="contact_content_title">Contact Information</div>
                <div className="contact_content_subtitle">
                  Fill up the form to get in touch with the NBNS Global team.
                </div>
                <ul className="contact_list">
                  <li className="contact_list_item_box">
                    <LocationOnIcon />
                    <span className="contact_list_item">
                      {settings?.address || ""}
                    </span>
                  </li>
                  <li className="contact_list_item_box">
                    <PhoneIcon />
                    <span className="contact_list_item">
                      {settings?.phone || ""}
                    </span>
                  </li>
                  <li className="contact_list_item_box">
                    <EmailIcon />
                    <span className="contact_list_item">
                      {settings?.email || ""}
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
                  <Box>
                    <CustomForm onSubmit={submitHandler}>
                      <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                        <Grid
                          item
                          className="col-lg-12"
                          style={{ marginRight: "0px" }}
                        >
                          <CustomInput
                            name="name"
                            label="Name"
                            placeholder="Guy Hawkins"
                            rows={15}
                          />
                        </Grid>
                        <Grid
                          item
                          className="col-lg-6"
                          sx={{ marginRight: "0px" }}
                        >
                          <CustomInput
                            name="email"
                            label="Email address"
                            type="email"
                            placeholder="guy.hawkin@gmail.com"
                            rows={15}
                          />
                        </Grid>
                        <Grid
                          item
                          className="col-lg-6"
                          sx={{ marginRight: "0px" }}
                        >
                          <CustomInput
                            name="phone"
                            label="Phone"
                            placeholder="Enter Subject"
                            rows={15}
                          />
                        </Grid>
                        <Grid
                          item
                          className="col-lg-12"
                          style={{ marginRight: "0px" }}
                        >
                          <CustomInput
                            name="subject"
                            label="Subject"
                            placeholder="Enter Subject"
                            rows={15}
                          />
                        </Grid>
                        <Grid
                          item
                          className="col-lg-12"
                          style={{ marginRight: "0px" }}
                        >
                          <CustomTextArea
                            name="message"
                            label="Message"
                            placeholder="Say something"
                            rows={5}
                          />
                        </Grid>
                        <Grid
                          item
                          className="col-lg-12"
                          style={{ marginRight: "0px" }}
                        >
                          <Box>
                            <CustomButton
                              buttonName="Submit Form"
                              loading={contact_loading}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </CustomForm>
                  </Box>
                </CustomFormProvider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
