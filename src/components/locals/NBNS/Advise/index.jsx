import PageBanner from "@/components/globals/PageBanner";
import { getAllHomeData } from "@/redux/homepage/actions";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdviceForm from "./Form";
import useStyles from "./styles";

const Advise = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { nbns_settings } = useSelector((state) => state.homepage);

  useEffect(() => {
    const data = {
      type: "nbns",
      id: 1,
    };
    dispatch(getAllHomeData(data));
  }, []);

  return (
    <>
      <PageBanner
        title={nbns_settings?.advice_title}
        subtitle={nbns_settings?.advice_subtitle}
        image={nbns_settings?.advice_banner}
        // title={adviceData?.advice1?.title}
        // subtitle={adviceData?.advice1?.subtitle}
        // image={adviceData?.advice1?.banner_image}
      />

      <Container>
        <Box className={classes.root}>
          <Box className={classes.headerWrapper}>
            <Typography className={classes.title}>
              Forging Pathways Together Through Shared Advice
            </Typography>
            <Typography className={classes.subtitle}>
              Nepali Lineage Citizenship Association
            </Typography>
          </Box>

          <Grid container justifyContent="center">
            <Grid item sm={8}>
              <Box className={classes.formContainer}>
                <Typography className={classes.formTitle}>
                  Contribute Your Wisdom
                </Typography>
                <Typography className={classes.description}>
                  Unlock the power of perspectives! We invite you to offer your
                  valuable advice, shaping meaningful journeys with your
                  insights.
                </Typography>

                <AdviceForm />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Advise;
