import CustomLoader from "@/components/common/CustomLoader/CustomLoader";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../ncc/redux/actions";
import { useStyles } from "./styles";

const MemberForm = ({ disabled, registration_number }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  // const countries = [
  //   {
  //     label: 'Nepal',
  //     value: 'Nepal'
  //   },
  //   { label: 'United Kingdom', value: 'uk' }
  // ];

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const { countries_list, get_countries_list_loading } = useSelector(
    (state) => state.ncc
  );

  const countryList = countries_list?.map((item, index) => ({
    label: item,
    value: item,
  }));
  return (
    <Box className={classes.root}>
      {get_countries_list_loading ? (
        <CustomLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <CustomInput name="first_name" label="Firstname" required />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="last_name" label="Lastname" required />
          </Grid>
          <Grid item sm={12}>
            <CustomInput
              disabled={disabled ? true : false}
              name="email"
              type="email"
              label="Email"
              required
            />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="phone" label="Phone" type="text" />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="city" label="City" />
          </Grid>
          <Grid item sm={12}>
            <CustomAutoComplete
              name="country_of_residence"
              label="Country of Residence"
              options={countryList}
              required
            />
          </Grid>
          {registration_number && (
            <Grid item sm={12}>
              <CustomInput
                name="registration_number"
                label="Registration Number"
              />
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default MemberForm;
