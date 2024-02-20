import CustomButton from "@/components/common/CustomButton/CustomButton";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomForm from "@/components/common/Form/CustomForm";
import CustomFormProvider from "@/components/common/Form/CustomFormProvider";
import CustomInput from "@/components/common/Form/CustomInput";
import { getCountries } from "@/components/locals/dashboard/ncc/redux/actions";
import useYupValidationResolver from "@/hooks/useYupValidationResolver";
import { postAdvice } from "@/redux/homepage/actions";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";
import useStyles from "./styles";

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { countries_list } = useSelector((state) => state.ncc);
  const { advice_loading } = useSelector((state) => state.advice);

  const countryList = countries_list?.map((item, index) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const { setValue, watch } = useFormContext({});

  const refetch = () => {
    const array = ["name", "email", "phone", "country_of_residence", "advice"];
    array?.map((item) => setValue(item, ""));
    // dispatch(getAdvice());
  };

  const onSubmit = (data) => {
    dispatch(postAdvice(data, refetch));
  };
  return (
    <CustomForm onSubmit={onSubmit}>
      <Grid
        container
        spacing={3}
        className={classes.advice_submit_form_container}
      >
        <Grid item className="col-lg-6" style={{ paddingRight: "0px" }}>
          <CustomInput name="name" label="Full Name" required />
        </Grid>
        <Grid item className="col-lg-6" style={{ paddingRight: "0px" }}>
          <CustomAutoComplete
            placeholder="Country of residence"
            name="country_of_residence"
            label="Country of residence"
            options={countryList ?? []}
            required
          />
          {/* <CustomInput name="country_of_residence" label="Country of Residence" required /> */}
        </Grid>
        <Grid item className="col-lg-6" style={{ paddingRight: "0px" }}>
          <CustomInput name="email" label="Email" type="email" required />
        </Grid>
        <Grid item className="col-lg-6" style={{ paddingRight: "0px" }}>
          <CustomInput name="phone" label="Phone" type="text" required />
        </Grid>
        <Grid item className="col-12" style={{ paddingRight: "0px" }}>
          <CustomInput
            name="advice"
            label="Advice"
            required
            multiline
            rows={8}
          />
        </Grid>
        <Grid item className="col-12" style={{ paddingRight: "0px" }}>
          <Box className={classes.submit_btn_box}>
            <CustomButton
              className={classes.submit_btn}
              buttonName="Share Your Wisdom"
              loading={advice_loading}
            />
          </Box>
        </Grid>
      </Grid>
    </CustomForm>
  );
};

const AdviceForm = () => {
  const defaultValues = {};
  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    // yup.array().required("Please select an hobby").min(1, "Please select an hobby")
    // country_of_resident: Yup.string().required('Please select a country'),
    email: Yup.string().email().required("Please enter email"),
    advice: Yup.string().required("Please write your advice before submitting"),
    phone: Yup.string().required("Phone number is required").min(10).max(10),
  });
  return (
    <CustomFormProvider
      defaultValues={defaultValues}
      resolver={useYupValidationResolver(validationSchema)}
    >
      <Form />
    </CustomFormProvider>
  );
};

export default AdviceForm;
