import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomPhoneAutoComplete from "@/components/common/Form/CustomPhoneAutoComplete";
import PageBanner from "@/components/globals/PageBanner";
import Login from "@/components/globals/login";
import Register from "@/components/globals/register";
import useScreenSize from "@/hooks/useScreenSize";
import useToggle from "@/hooks/useToggle";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import {
  emailCheck,
  getAllSurvey,
  getCountriesCode,
  saveDetails,
} from "@/redux/homepage/actions";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import useStyles from "./styles";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Please enter first name"),
  last_name: Yup.string().required("Please enter last name"),
  phone: Yup.string().required("Please enter phone").min(10),
  email: Yup.string().required("Please enter email"),
  country_of_residence: Yup.string().required("Please select a country"),
});
const Survey = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useRouter();
  const [open, openFunction] = useToggle(false);
  const [openRegister, openFunctionRegister] = useToggle(false);
  const [openForm, formOpenFunction] = useToggle(false);
  const [userFormDetails, setUserFormDetails] = useState([]);
  const [surveyID, setSurveyID] = useState();
  const [surveySlug, setSurveySlug] = useState();
  const [number, setNumber] = useState("");

  const startSurvey = (id, slug) => {
    setSurveyID(id);
    setSurveySlug(slug);
    formOpenFunction();
  };

  const { nbns_settings, email_check_loading } = useSelector(
    (state) => state.homepage
  );
  const { countries_list_code } = useSelector((state) => state.homepage);

  const countryList = countries_list_code?.map((item, index) => ({
    label: item?.name,
    value: item?.name,
    code: item?.dial_code,
  }));

  useEffect(() => {
    dispatch(getCountriesCode());
  }, []);

  const refetch = (data) => {
    dispatch(
      saveDetails({ ...data, survey_id: surveyID, survey_slug: surveySlug })
    );
    navigate.push(`questions`);
  };
  const onSubmitDetails = (data) => {
    setUserFormDetails({ ...data });
    dispatch(emailCheck({ email: data?.email }, () => refetch(data)));
  };
  const handleCancel = () => {
    formOpenFunction();
  };
  const { survey } = useSelector((state) => state.homepage);
  useEffect(() => {
    dispatch(getAllSurvey());
  }, []);

  const defaultValues = {
    country_of_residence: "",
  };

  const screenSize = useScreenSize();

  return (
    <>
      <PageBanner
        image={nbns_settings?.survey_banner}
        title={nbns_settings?.survey_title}
        subtitle="नेपाल र नेपालीलाई समृद्ध बनाउन के गर्न सकिन्छ ? विश्वभर छरिएर रहेका नेपालीहरुले विदेशमा आर्जन गरेको शिक्षा, सम्पत्ति, सीप, सम्पर्क र सञ्जाललाई नेपालको हितमा कसरी उपायोग गर्नुपर्छ ? तपाईंसँग कुनै विचार वा उपाय छ भने यहाँ सुझाउनुहोस् ।"
      />

      <Container>
        <Box className={classes.root}>
          <Box>
            {/* <Box className={classes.headerWrapper}>
              <Typography className={classes.title}>
                Elevate Your Voice: Join Our Survey Today!
              </Typography>
              <Typography className={classes.subtitle}>
                Nepali Lineage Citizenship Association
              </Typography>
            </Box> */}
            <Box textAlign="center" marginTop={4}>
              {/* {isLoggedIn() ? ( */}
              {/* <Button variant="contained" onClick={startSurvey}>
                Start Making a Differences
              </Button> */}

              {/* <SurveyCards handleClick={startSurvey} /> */}
              <Box marginY={6}>
                {/* <Container> */}
                <Grid container spacing={3}>
                  {survey?.length !== 0 ? (
                    survey?.map((item) => {
                      return (
                        <Grid
                          item
                          className="col-sm-6 col-md-4"
                          key={survey?.id}
                        >
                          <div
                            style={{
                              boxShadow:
                                "0px 8px 20px 0px rgba(18, 17, 39, 0.10)",
                              backgroundColor: "#fff",
                              borderRadius: "6px",
                            }}
                          >
                            <div
                              style={{
                                padding: "10px 15px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "flex-start",
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: "20px",
                                    fontWeight: "600",
                                    marginTop: "13px",
                                    marginBottom: "6px",
                                    paddingBottom: "60px",
                                    height: "40px",
                                    textAlign: "start",
                                  }}
                                >
                                  {item?.title?.length < 49
                                    ? item?.title
                                    : `${item?.title?.substring(0, 50)}...`}
                                </p>
                                <p
                                  className="survey_description"
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    textAlign: "start",
                                  }}
                                >
                                  {item?.description}
                                </p>
                              </div>
                              <Button
                                style={{
                                  marginBottom: "10px",
                                }}
                                variant="contained"
                                onClick={() =>
                                  startSurvey(item?.id, item?.slug)
                                }
                              >
                                Take part
                              </Button>
                            </div>
                          </div>
                        </Grid>
                      );
                    })
                  ) : (
                    <Box sx={{ fontSize: "25px", marginLeft: "25px" }}>
                      No serveys available
                    </Box>
                  )}
                </Grid>
                {/* </Container> */}
              </Box>
            </Box>
            <Box marginTop={4}>
              <Typography className={classes.description}>
                नेपाल र नेपालीलाई समृद्ध बनाउन के गर्न सकिन्छ ? विश्वभर छरिएर
                रहेका नेपालीहरुले विदेशमा आर्जन गरेको शिक्षा, सम्पत्ति, सीप,
                सम्पर्क र सञ्जाललाई नेपालको हितमा कसरी उपायोग गर्नुपर्छ ?
                तपाईंसँग कुनै विचार वा उपाय छ भने यहाँ सुझाउनुहोस् ।
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
      <CustomModal open={open} handleClose={openFunction} width={`20rem`}>
        <Login handleClose={openFunction} registerOpen={openFunctionRegister} />
      </CustomModal>
      <CustomModal
        open={openRegister}
        handleClose={openFunctionRegister}
        width={`20rem`}
      >
        <Register handleClose={openFunctionRegister} loginOpen={openFunction} />
      </CustomModal>
      <CustomModal
        open={openForm}
        handleClose={formOpenFunction}
        modalTitle="Submit information before survey submission"
        // modalSubtitle=""
        nonClose
        padding
        titlePadding
        width={`${screenSize?.width < 710 ? "20rem" : "40rem"}`}
      >
        <CustomFormProvider
          resolver={useYupValidationResolver(validationSchema)}
          defaultValues={defaultValues}
        >
          <CustomForm onSubmit={onSubmitDetails}>
            <FormComponent
              handleCancel={handleCancel}
              countryList={countryList}
              email_check_loading={email_check_loading}
              setNumber={setNumber}
              number={number}
            />
          </CustomForm>
        </CustomFormProvider>
      </CustomModal>
    </>
  );
};

const FormComponent = ({
  handleCancel,
  countryList,
  email_check_loading,
  number,
  setNumber,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(null); // Track selected country

  const handleCountrySelection = (selectedValue) => {
    setSelectedCountry(selectedValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item className="col-md-6" style={{ marginRight: "0px" }}>
        <CustomInput
          name="first_name"
          label="First Name"
          placeholder="Enter your first name"
          required
        />
      </Grid>
      <Grid item className="col-md-6" style={{ marginRight: "0px" }}>
        <CustomInput
          name="last_name"
          label="Last Name"
          placeholder="Enter your last name"
          required
        />
      </Grid>
      <Grid item className="col-md-6" style={{ marginRight: "0px" }}>
        <CustomInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </Grid>
      {/* <Grid item className="col-md-6" style={{ marginRight: '0px' }}>
        <CustomInput
          name="phone"
          label="Phone"
          type="number"
          placeholder="Enter your phone number"
          // required
        />
      </Grid> */}
      <Grid item className="col-md-6" style={{ marginRight: "0px" }}>
        <CustomPhoneAutoComplete
          placeholder="Country of residence"
          name="country_of_residence"
          label="Country of residence"
          options={countryList ?? []}
          required
          // phoneSelect
          onCountrySelection={handleCountrySelection}
        />
      </Grid>

      <Grid item className="col-md-12" style={{ marginRight: "0px" }}>
        <CustomInput
          name="phone"
          label="Phone Number"
          placeholder="Enter your phone number"
          required
          defaultValue={selectedCountry}
        />
        {/* <div className={classes.phoneInput}>
          <PhoneInput
            name="phone"
            country={lowercaseString}
            value={number}
            placeholder="Enter phone"
            onChange={(value) => setNumber(value)}
            countryCodeEditable={false}
          />
        </div> */}
      </Grid>

      <Grid item className="col-md-6" sx={{ marginTop: "20px" }}>
        <Button
          onClick={() => handleCancel()}
          variant="outlined"
          style={{ color: "#F10056", borderColor: "#F10056", width: "100%" }}
        >
          {" "}
          Cancel
        </Button>
      </Grid>
      <Grid item className="col-md-6" sx={{ marginTop: "20px" }}>
        <Tooltip title={"Fill up all the fields before submitting"}>
          <Button
            type="submit"
            variant="contained"
            // disabled={!isFormValid}
            style={{ color: "#fff", backgroundColor: "#1769AA", width: "100%" }}
          >
            {" "}
            {email_check_loading ? <CircularProgress /> : "Next"}
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default Survey;
