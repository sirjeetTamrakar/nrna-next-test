import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../redux/actions";
import { useStyles } from "./styles";

const BusinessManagementForm = ({ featureImage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { businessData } = useSelector((state) => state.business);
  const { categoryData } = useSelector((state) => state.news);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const businessCategory = businessData?.data?.map((item) => ({
    label: item?.fullname,
    value: item?.id,
  }));

  // useEffect(() => {
  //   dispatch(getCategory());
  // }, []);

  // const refetch = () => {
  //   if (user?.role_name == Roles?.Member) {
  //     const data = { page: page + 1, pagination_limit: rowsPerPage, type: 'member', id: user?.id };
  //     dispatch(getNews(data));
  //   } else if (user?.role_name == Roles?.NCC) {
  //     const data = {
  //       page: page + 1,
  //       pagination_limit: rowsPerPage,
  //       type: 'ncc',
  //       id: user?.ncc?.id
  //     };
  //     dispatch(getNews(data));
  //   } else {
  //     const data = { page: page + 1, pagination_limit: rowsPerPage };
  //   dispatch(getNews());
  //   }
  // };

  // useEffect(() => {
  //   user && refetch();
  // }, [page, user]);

  useEffect(() => {
    dispatch(getBusiness());
  }, []);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <CustomInput name="order_number" label="News order" required />
        </Grid>
        <Grid item sm={12}>
          <CustomAutoComplete
            placeholder="Business Category"
            name="business_id"
            label="Select Business"
            options={businessCategory ?? []}
            required
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BusinessManagementForm;
