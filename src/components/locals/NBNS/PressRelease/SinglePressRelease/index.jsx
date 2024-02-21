import {
  getPressRelease,
  getSinglePressRelease,
} from "@/redux/homepage/actions";
import { changeDateFormat } from "@/utils/dateUtils";
import { Box, CircularProgress, Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SinglePressRelease = () => {
  const dispatch = useDispatch();
  const { slug } = useRouter()?.query;
  const pathname = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { press_release, single_press_release, single_press_release_loading } =
    useSelector((state) => state.homepage);
  const recentPress = press_release?.data
    ?.filter((list) => list?.slug !== slug)
    .slice(0, 4);

  useEffect(() => {
    slug && dispatch(getSinglePressRelease(slug));
  }, [slug]);
  useEffect(() => {
    dispatch(getPressRelease());
  }, []);

  return (
    <>
      {/* <SecondaryNav category={news_category} setSelected={setSelected} selected={selected} /> */}

      <div className="container">
        {single_press_release_loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "60vh" }}
          >
            <CircularProgress size={30} />
          </Box>
        ) : (
          <div className="single_news_page">
            <Grid container className="news_main_grid">
              <Grid item md={8}>
                <div className="single_news_page_content">
                  <>
                    <div className="single_news_page_imgwrap">
                      <img
                        src={single_press_release?.press_image}
                        alt={single_press_release?.title}
                      />
                    </div>
                    <div className="single_news_page_title">
                      {single_press_release?.title}
                    </div>

                    <div className="single_news_page_date">
                      {changeDateFormat(
                        single_press_release?.created_at,
                        "DD-MMM-YYYY HH:MM"
                      )}{" "}
                      | Created by: {single_press_release?.user}
                    </div>
                    <Box
                      sx={{
                        "& img": {
                          width: "100% !important",
                        },
                      }}
                    >
                      <div
                        className="single_news_page_long"
                        dangerouslySetInnerHTML={{
                          __html: single_press_release?.description,
                        }}
                      ></div>
                    </Box>
                  </>
                </div>
              </Grid>
              <Grid item md={4} sm={12} className="recent_news">
                <div className="single_news_page_sidebar">
                  <div className="recent_news">
                    <div className="recent_news_title">
                      Recent Press Release
                    </div>
                    {recentPress?.length > 0 ? (
                      recentPress.map((recent) => (
                        <Link
                          key={recent.id}
                          href={`/nbns/press-release/${recent?.slug}`}
                          className="recent_news_item"
                        >
                          <div className="img_wrapper">
                            <img src={recent?.press_image} alt="" />
                          </div>
                          <div className="item_content">
                            <div className="item_content_title">
                              {recent?.title}
                            </div>
                            <div className="item_content_date">
                              {recent?.created_date}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="button_wrap">
                        <h3 className="text-center">
                          No press release available.
                        </h3>
                      </div>
                    )}
                    <div className="button_wrap">
                      <Link href={`/nbns/press-release`} className="btn-sm">
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};

export default SinglePressRelease;
