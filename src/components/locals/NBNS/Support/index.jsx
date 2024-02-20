import PageBanner from "@/components/globals/PageBanner";
import useToggle from "@/hooks/useToggle";
import { getAllHomeData } from "@/redux/homepage/actions";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

const Support = () => {
  const classes = useStyles();
  const [show, showToggle] = useToggle(false);
  const dispatch = useDispatch();
  const [supportData, setSupportData] = useState();
  const { home_data } = useSelector((state) => state.homepage);
  const { nbns_settings } = useSelector((state) => state.homepage);

  useEffect(() => {
    const data = {
      type: "nbns",
      id: 1,
    };
    dispatch(getAllHomeData(data));
  }, []);

  useEffect(() => {
    const newArray = home_data?.data?.filter(
      (item) => item?.slug === "support"
    );
    const newObj = {};

    newArray?.forEach((item, index) => {
      newObj[`support${index + 1}`] = item;
    });
    setSupportData(newObj);
  }, [home_data?.data]);
  return (
    <>
      <PageBanner
        title={nbns_settings?.support_title}
        subtitle={nbns_settings?.support_subtitle}
        image={nbns_settings?.support_banner}
      />

      <Container>
        <Box className={classes.root}>
          <Box>
            <Box className={classes.headerWrapper}>
              <Typography className={classes.title}>
                Fuel Our Cause with Your Generosity
              </Typography>
              <Typography className={classes.subtitle}>
                Nepali Lineage Citizenship Association
              </Typography>
            </Box>

            <Box marginTop={4}>
              <Typography className={classes.description}>
                Join hands with us in making a lasting impact through our
                transformative survey. Your participation isn't just a response;
                it's a powerful statement that you believe in the strength of
                collective action for our cause.
              </Typography>
              <Typography className={classes.description}>
                By participating, you're not just sharing your opinions; you're
                contributing to a movement. A movement that seeks to break down
                barriers, foster inclusivity, and sow the seeds of positive
                transformation. Each response ignites a ripple effect, inspiring
                others to stand up and be heard.
              </Typography>
              <Typography className={classes.description}>
                Your voice, alongside countless others, will shape policies,
                influence decisions, and champion causes that demand attention.
                Together, we're not just answering questions; we're taking
                action. Let's rise above the ordinary and work towards an
                extraordinary society. Participate now, and be the change we all
                aspire to see."
              </Typography>
            </Box>
            <Box textAlign="center" marginTop={4}>
              <Button variant="contained" onClick={showToggle}>
                <Box display="flex" columnGap="10px">
                  <VolunteerActivismIcon />{" "}
                  <Typography>Show You Care</Typography>
                </Box>
              </Button>
            </Box>
            {show && (
              <Box className={classes.donationWrapper}>
                <Typography variant="h5">To donate please contact:</Typography>
                <Typography variant="body1">Bank Name: </Typography>
                <Typography variant="body1">Bank A/C: </Typography>
                <Typography variant="body1">Email: </Typography>
                <Typography variant="body1">Phone: </Typography>
                <Typography variant="h6" textAlign="center">
                  Thank You! For your support
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Support;
