import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { contactUs } from "@/redux/homepage/actions";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

const Form = ({ defaultValues }) => {
  const dispatch = useDispatch();
  const { reset } = useFormContext();
  const { contact_loading } = useSelector((state) => state.homepage);
  const handleSuccess = () => {
    reset(defaultValues);
  };
  const onSubmit = (data) => {
    dispatch(contactUs(data, handleSuccess));
  };
  return (
    <Box className="contact_form">
      <CustomForm onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item className="col-md-12" style={{ paddingRight: "0px" }}>
            <CustomInput name="name" label="Full Name" required />
          </Grid>
          <Grid item className="col-lg-6" style={{ paddingRight: "0px" }}>
            <CustomInput name="email" label="Email" type="email" required />
          </Grid>
          <Grid item className="col-lg-6" style={{ paddingRight: "0px" }}>
            <CustomInput
              name="phone"
              label="Phone Number"
              type="text"
              required
            />
          </Grid>
          <Grid item className="col-md-12" style={{ paddingRight: "0px" }}>
            <CustomInput name="subject" label="Subject" required />
          </Grid>
          <Grid item className="col-md-12" style={{ paddingRight: "0px" }}>
            <CustomInput
              name="message"
              label="Message"
              multiline
              rows={4}
              required
            />
          </Grid>
        </Grid>

        <div className="btn_container">
          {contact_loading ? (
            <button className="btn-md" disabled>
              <Box display="flex" columnGap="10px" alignItems="center">
                <CircularProgress size={18} /> Sending
              </Box>
            </button>
          ) : (
            <button
              type="submit"
              className="btn-md col-12 col-lg-2 "
              style={{ justifyContent: "center" }}
            >
              Send
            </button>
          )}
        </div>
      </CustomForm>
    </Box>
  );
};

const ContactForm = () => {
  const defaultValues = {
    name: "",
    subject: "",
    email: "",
    message: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter your name"),
    subject: Yup.string().required("Please enter subject for the message"),
    email: Yup.string().email().required("Please enter your email"),
    message: Yup.string().required("Please enter message"),
    phone: Yup.string().required("Please enter phone").min(10).max(10),
  });

  return (
    <CustomFormProvider
      defaultValues={defaultValues}
      resolver={useYupValidationResolver(validationSchema)}
    >
      <Form defaultValues={defaultValues} />
    </CustomFormProvider>
  );
};

export default ContactForm;
