import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../userManagement/redux/actions";
import { useStyles } from "./styles";

const CandidateForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.user);

  const createdByUsers = users?.data?.map((item) => ({
    label: item?.full_name ? item?.full_name : item?.username,
    value: item?.id,
  }));

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomAutoComplete
            name="member_id"
            label="Member"
            options={createdByUsers || []}
            required
            key={createdByUsers}
          />
        </Grid>
        <Grid item sm={6}>
          <CustomInput name="designation" label="Designation" required />
        </Grid>
        <Grid item sm={6}>
          <CustomInput name="order" label="Order" required type="number" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CandidateForm;
