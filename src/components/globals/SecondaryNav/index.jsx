"use client";
import CustomModal from "@/components/common/CustomModal/CustomModal";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import CustomPhoneAutoComplete from "@/components/common/Form/CustomPhoneAutoComplete";
import Register from "@/components/globals/register";
import useScreenSize from "@/hooks/useScreenSize";
import useToggle from "@/hooks/useToggle";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import {
  deleteBuisnessFollow,
  deleteNBNSFollow,
  getBusinessFollow,
  getCountriesCode,
  getNBNSFollow,
  getNcc,
  postBusinessCreateAccount,
  postBusinessJoin,
  postNBNSJoin,
} from "@/redux/homepage/actions";
import { isLoggedIn } from "@/utils";
import { HourglassBottom } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  Container,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useStyles } from "./styles";

const validationSchema = Yup.object({
  first_name: Yup.string().required("Please enter first name"),
  last_name: Yup.string().required("Please enter last name"),
  email: Yup.string().required("Please enter email"),
  country_of_residence: Yup.string().required("Please select a country"),
});

const SecondaryNav = ({
  options,
  selected,
  title,
  color,
  setSelected,
  ncc,
  business,
  nbns,
  single_business,
  subTitle,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [localSelected, setLocalSelected] = useState(selected);
  const [open, openFunction] = useToggle(false);
  const [openRegister, openFunctionRegister] = useToggle(false);
  const [filteredNcc, setFilteredNcc] = useState();
  const [filteredNccCode, setFilteredNccCode] = useState();
  const [openForm, formOpenFunction] = useToggle(false);

  const joinBusiness = () => {
    formOpenFunction();
  };
  const handleCancel = () => {
    formOpenFunction();
  };

  const {
    ncc: nccData,
    businessFollowData,
    get_business_follow_loading,
    nbnsFollowData,
    get_nbns_follow_loading,
    countries_list_code,
    business_create_account_loading,
  } = useSelector((state) => state.homepage);
  const { user } = useSelector((state) => state.auth);

  const { ncc: slug } = useRouter()?.query;

  useEffect(() => {
    const newArray = nccData?.data?.filter((item) => item?.slug === slug);
    const newObj = {};

    newArray?.forEach((item, index) => {
      newObj[`nccID1`] = item;
    });
    setFilteredNcc(newObj);
  }, [nccData?.data, slug]);

  useEffect(() => {
    const newArray = countries_list_code?.filter(
      (item) => item?.name === filteredNcc?.nccID1?.country_name
    );
    const newObj = {};

    newArray?.forEach((item, index) => {
      newObj[`nccCode1`] = item;
    });
    setFilteredNccCode(newObj);
  }, [countries_list_code, filteredNcc?.nccID1?.country_name]);

  const handleRegisterClick = () => {
    openFunctionRegister();
  };

  useEffect(() => {
    if (selected) {
      setLocalSelected(selected);
    }
  }, [selected]);

  const handleOptionClick = (value) => {
    setSelected(value);
  };
  const checkActive = (slug) => {
    if (localSelected) {
      if (slug === localSelected) {
        return "active";
      } else return "";
    } else if (slug === options?.value) {
      return "active";
    } else {
      return "";
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (business) {
      const formDataBusiness = new FormData();
      formDataBusiness.append("business_id", single_business?.id);
      formDataBusiness.append("user_id", user?.id);
      formDataBusiness.append("nbns", 0);
      const fetchData = {
        user_id: user?.id,
        business_id: single_business?.id,
      };
      dispatch(postBusinessJoin(formDataBusiness, fetchData));
    } else if (nbns) {
      const fetchData = {
        user_id: user?.id,
      };

      dispatch(postNBNSJoin(fetchData));
    } else {
      return;
    }
  };

  useEffect(() => {
    if (business && user?.id) {
      const data = {
        user_id: user?.id,
        business_id: single_business?.id,
      };
      dispatch(getBusinessFollow(data));
    } else if (nbns && user?.id) {
      const data = {
        user_id: user?.id,
      };
      dispatch(getNBNSFollow(data));
    } else {
      return;
    }
  }, [single_business?.id]);

  const onSubmitDelete = (e) => {
    e.preventDefault();
    if (business) {
      const formDataBusiness = {
        user_id: user?.id,
        business_id: single_business?.id,
      };

      dispatch(deleteBuisnessFollow(formDataBusiness));
    } else if (nbns) {
      const fetchData = {
        user_id: user?.id,
      };

      dispatch(deleteNBNSFollow(fetchData));
    } else {
      return;
    }
  };

  const screenSize = useScreenSize();

  const onSubmitDetails = (data) => {
    if (business) {
      dispatch(
        postBusinessCreateAccount(
          {
            ...data,
            business_id: single_business?.id,
            business_title: single_business?.fullname,
          },
          formOpenFunction
        )
      );
    } else if (nbns) {
      dispatch(
        postBusinessCreateAccount({ ...data, nbns: "1" }, formOpenFunction)
      );
    } else {
      return;
    }
  };

  const countryList = countries_list_code?.map((item, index) => ({
    label: item?.name,
    value: item?.name,
    code: item?.dial_code,
  }));

  const defaultValuesJoinForm = {
    country_of_residence: "",
  };

  useEffect(() => {
    dispatch(getCountriesCode());
  }, []);

  const businessDetails = businessFollowData?.[0];

  useEffect(() => {
    dispatch(getNcc());
  }, []);

  return (
    <>
      <Box
        className={`${classes.root} second-nav-root`}
        sx={color && { backgroundColor: color }}
      >
        <Container>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {screenSize?.width < 710 ? (
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {title && (
                  <Typography
                    variant="h5"
                    className={classes.title}
                    sx={{ marginBottom: "-10px" }}
                  >
                    {title}
                  </Typography>
                )}
                {subTitle && (
                  <Typography
                    className={classes.title}
                    sx={{ fontSize: "18px !important" }}
                  >
                    {subTitle}
                  </Typography>
                )}
              </Box>
            ) : (
              <>
                {title && (
                  <Typography variant="h5" className={classes.title}>
                    {title} {subTitle}
                  </Typography>
                )}
              </>
            )}
            {ncc && !isLoggedIn() && (
              <Box
                className={`${classes.header} second-nav-title`}
                sx={{ marginTop: "10px" }}
              >
                <Box className={`${classes.header} second-nav-title`}>
                  <button
                    variant="contained"
                    className={classes.joinBtnNavbar}
                    onClick={handleRegisterClick}
                    style={
                      color && {
                        backgroundColor: color,
                      }
                    }
                  >
                    {" "}
                    Join
                  </button>
                </Box>
              </Box>
            )}
            {business && isLoggedIn() && (
              <>
                {!businessDetails?.business_id ||
                businessDetails?.status === "rejected" ? (
                  <Box
                    className={`${classes.header} second-nav-title`}
                    sx={{ marginTop: "10px" }}
                  >
                    <Box className={`${classes.header} second-nav-title`}>
                      <form onSubmit={onSubmit}>
                        <button
                          variant="contained"
                          className={classes.joinBtnNavbar}
                          type="submit"
                          disabled={get_business_follow_loading}
                          style={{
                            backgroundColor: "#276FC4",
                          }}
                        >
                          {get_business_follow_loading ? (
                            <CircularProgress
                              style={{
                                color: "#fff",
                                height: "21px",
                                width: "21px",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                margin: "auto",
                                alignItems: "center",
                              }}
                            />
                          ) : (
                            "Follow"
                          )}
                        </button>
                      </form>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className={`${classes.header} second-nav-title`}
                    sx={{ marginTop: "10px" }}
                  >
                    <Box className={`${classes.header} second-nav-title`}>
                      {/* <form onSubmit={onSubmitDelete}> */}
                      <button
                        onClick={onSubmitDelete}
                        variant="contained"
                        className={classes.joinBtnNavbar}
                        disabled={get_business_follow_loading}
                        style={{
                          backgroundColor: "#fff",
                          display: "flex",

                          color:
                            businessDetails?.status === "pending"
                              ? "#FF6C22"
                              : "#276FC4",
                        }}
                      >
                        {get_business_follow_loading ? (
                          <CircularProgress
                            style={{
                              color: "#276FC4",
                              height: "21px",
                              width: "21px",
                              display: "flex",
                              justifyContent: "center",
                              textAlign: "center",
                              margin: "auto",
                              alignItems: "center",
                            }}
                          />
                        ) : (
                          <div style={{ display: "flex" }}>
                            {businessDetails?.status === "pending"
                              ? "Pending"
                              : "Following"}
                            <span style={{ marginLeft: "5px" }}>
                              {businessDetails?.status === "pending" ? (
                                <HourglassBottom sx={{ color: "#FF6C22" }} />
                              ) : (
                                <CheckCircleIcon sx={{ color: "#276FC4" }} />
                              )}
                            </span>
                          </div>
                        )}
                      </button>
                      {/* </form> */}
                    </Box>
                  </Box>
                )}
              </>
            )}
            {nbns && isLoggedIn() && (
              <>
                {Number(nbnsFollowData?.[0]?.follow_nbns) === 1 ? (
                  <Box
                    className={`${classes.header} second-nav-title`}
                    sx={{ marginTop: "10px" }}
                  >
                    <Box className={`${classes.header} second-nav-title`}>
                      <form onSubmit={onSubmitDelete}>
                        <button
                          variant="contained"
                          className={classes.joinBtnNavbar}
                          type="submit"
                          // onClick={handleRegisterClick}
                          style={{
                            backgroundColor: "#fff",
                            color: "#276FC4",
                            display: "flex",
                          }}
                        >
                          {" "}
                          {get_nbns_follow_loading ? (
                            <CircularProgress
                              style={{
                                color: "#276FC4",
                                height: "21px",
                                width: "21px",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                margin: "auto",
                                alignItems: "center",
                              }}
                            />
                          ) : (
                            <div style={{ display: "flex" }}>
                              Following
                              <span style={{ marginLeft: "5px" }}>
                                <CheckCircleIcon sx={{ color: "#276FC4" }} />
                              </span>
                            </div>
                          )}
                        </button>
                      </form>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className={`${classes.header} second-nav-title`}
                    sx={{ marginTop: "10px" }}
                  >
                    <Box className={`${classes.header} second-nav-title`}>
                      <form onSubmit={onSubmit}>
                        <button
                          variant="contained"
                          className={classes.joinBtnNavbar}
                          type="submit"
                          // onClick={handleRegisterClick}
                          style={{
                            backgroundColor: "#276FC4",
                          }}
                        >
                          {" "}
                          {get_nbns_follow_loading ? (
                            <CircularProgress
                              style={{
                                color: "#fff",
                                height: "21px",
                                width: "21px",
                                display: "flex",
                                justifyContent: "center",
                                textAlign: "center",
                                margin: "auto",
                                alignItems: "center",
                              }}
                            />
                          ) : (
                            "Follow"
                          )}
                        </button>
                      </form>
                    </Box>
                  </Box>
                )}
              </>
            )}
            {/* business logged out Join */}
            {business && !isLoggedIn() && (
              <Box
                className={`${classes.header} second-nav-title`}
                sx={{ marginTop: "10px" }}
              >
                <Box className={`${classes.header} second-nav-title`}>
                  <button
                    onClick={joinBusiness}
                    variant="contained"
                    className={classes.joinBtnNavbar}
                    // type="submit"
                    disabled={get_business_follow_loading}
                    // onClick={handleRegisterClick}
                    style={{
                      backgroundColor: "#276FC4",
                    }}
                  >
                    {" "}
                    Join
                  </button>
                </Box>
              </Box>
            )}
            {/* nbns logged out Join */}
            {nbns && !isLoggedIn() && (
              <Box
                className={`${classes.header} second-nav-title`}
                sx={{ marginTop: "10px" }}
              >
                <Box className={`${classes.header} second-nav-title`}>
                  <button
                    onClick={joinBusiness}
                    variant="contained"
                    className={classes.joinBtnNavbar}
                    // type="submit"
                    disabled={get_business_follow_loading}
                    // onClick={handleRegisterClick}
                    style={{
                      backgroundColor: "#276FC4",
                    }}
                  >
                    {" "}
                    Join
                  </button>
                </Box>
              </Box>
            )}
          </Box>
          <ul className={`${classes.list} second-nav-list`}>
            {options?.map((list, index) => (
              <li
                className={checkActive(list?.value)}
                key={index}
                // style={{ width: 'max-content' }}
                onClick={() => {
                  handleOptionClick(list.value);
                  list.clickFunction();
                }}
              >
                <div style={{ width: "max-content" }}>{list?.title}</div>
              </li>
            ))}
          </ul>
        </Container>
      </Box>
      <CustomModal
        open={openRegister}
        handleClose={openFunctionRegister}
        width={`22rem`}
      >
        <Register
          handleClose={openFunctionRegister}
          loginOpen={openFunction}
          defaultNccCountry={filteredNcc?.nccID1?.country_name}
          nccCode={filteredNccCode?.nccCode1?.dial_code}
        />
      </CustomModal>
      <CustomModal
        open={openForm}
        handleClose={formOpenFunction}
        modalTitle={`Submit Information before joining ${
          business ? "Business" : "NBNS"
        }`}
        // modalSubtitle=""
        nonClose
        padding
        titlePadding
        width={`${screenSize?.width < 710 ? "20rem" : "30rem"}`}
      >
        <CustomFormProvider
          resolver={useYupValidationResolver(validationSchema)}
          defaultValues={defaultValuesJoinForm}
        >
          <CustomForm onSubmit={onSubmitDetails}>
            <FormComponent
              handleCancel={handleCancel}
              countryList={countryList}
              loading={business_create_account_loading}
              defaultNccCountry={filteredNcc?.nccID1?.country_name}
              nccData={nccData?.data}
              slug={slug}
              // email_check_loading={email_check_loading}
              // setNumber={setNumber}
              // number={number}
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
  loading,
  defaultNccCountry,
  nccData,
  slug,
  nccCode,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(""); // Track selected country

  const handleCountrySelection = (selectedValue) => {
    setSelectedCountry(selectedValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item className="col-md-12" style={{ marginRight: "0px" }}>
        <CustomInput
          name="first_name"
          label="First Name"
          placeholder="Enter your first name"
          required
        />
      </Grid>
      <Grid item className="col-md-12" style={{ marginRight: "0px" }}>
        <CustomInput
          name="last_name"
          label="Last Name"
          placeholder="Enter your last name"
          required
        />
      </Grid>
      <Grid item className="col-md-12" style={{ marginRight: "0px" }}>
        <CustomInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </Grid>
      <Grid item className="col-md-12" style={{ marginRight: "0px" }}>
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
          label="Phone"
          // type="number"
          placeholder="Enter your phone"
          // required
          defaultValue={nccCode ? nccCode : selectedCountry}
        />
      </Grid>
      <Grid item className="col-md-12" sx={{ marginTop: "20px" }}>
        <Tooltip title={"Fill up all the fields before submitting"}>
          <Button
            type="submit"
            variant="contained"
            // disabled={!isFormValid}
            style={{ color: "#fff", backgroundColor: "#1769AA", width: "100%" }}
          >
            {" "}
            {loading ? (
              <CircularProgress
                style={{ height: "22px", width: "22px", color: "#fff" }}
              />
            ) : (
              "Submit"
            )}
          </Button>
        </Tooltip>
      </Grid>

      <Grid item className="col-md-12" sx={{ marginTop: "20px" }}>
        <Button
          onClick={() => handleCancel()}
          variant="outlined"
          style={{ color: "#F10056", borderColor: "#F10056", width: "100%" }}
        >
          {" "}
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default SecondaryNav;
