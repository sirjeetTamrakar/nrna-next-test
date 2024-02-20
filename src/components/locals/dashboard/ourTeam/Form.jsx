import CustomLoader from "@/components/common/CustomLoader/CustomLoader";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../userManagement/redux/actions";
import { useStyles } from "./styles";

const OurTeamForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { users, users_loading } = useSelector((state) => state.user);
  const { departmentData, get_department_loading } = useSelector(
    (state) => state.department
  );

  const createdByUsers = users?.data?.map((item) => ({
    label: item?.full_name ? item?.full_name : item?.username,
    value: item?.id,
  }));
  const department = departmentData?.data?.map((item) => ({
    label: item?.title,
    value: item?.id,
  }));

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box className={classes.root}>
      {get_department_loading || users_loading ? (
        <CustomLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <CustomAutoComplete
              name="member_id"
              label="Member"
              options={createdByUsers || []}
              required
              key={createdByUsers}
            />
          </Grid>
          <Grid item sm={6}>
            <CustomAutoComplete
              name="our_team_category_id"
              label="Department"
              options={department || []}
              required
              key={department}
            />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="designation" label="Designation" required />
          </Grid>
          <Grid item sm={6}>
            <CustomInput name="order" label="Order" required type="number" />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default OurTeamForm;
