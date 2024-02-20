import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../redux/actions";
// import { getCountries } from '../redux/actions';
import { useStyles } from "./styles";

const MemberForm = ({ disabled, countrySlug }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <Box className={classes.root}>
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
          <CustomInput
            name="country_of_residence"
            label="Country of Residence"
            disabled
          />
        </Grid>
        {/* <Grid item sm={12}>
          <CustomAutoComplete
            name="country_of_residence"
            label="Country of Residence"
            options={countryList}
            required
          />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default MemberForm;
