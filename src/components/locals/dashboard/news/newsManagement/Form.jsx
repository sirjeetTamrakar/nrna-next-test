import CustomLoader from "@/components/common/CustomLoader/CustomLoader";
import CustomAutoComplete from "@/components/common/Form/CustomAutoComplete";
import CustomInput from "@/components/common/Form/CustomInput";
import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNews } from "../redux/actions";
import { useStyles } from "./styles";

const NewsManagementForm = ({ featureImage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const { newsData, get_news_loading } = useSelector((state) => state.news);
  const { categoryData } = useSelector((state) => state.news);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const newsCategory = newsData?.data?.map((item) => ({
    label: item?.title,
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
    dispatch(getNews());
  }, []);

  return (
    <Box className={classes.root}>
      {get_news_loading ? (
        <CustomLoader />
      ) : (
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <CustomInput name="order_number" label="News order" required />
          </Grid>
          <Grid item sm={12}>
            <CustomAutoComplete
              placeholder="News Category"
              name="news_id"
              label="Select news"
              options={newsCategory ?? []}
              required
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default NewsManagementForm;
