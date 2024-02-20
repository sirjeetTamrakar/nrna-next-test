import {
  getAllNews,
  getNewsCategory,
  getSingleNCC,
  getSingleNews,
} from "@/redux/homepage/actions";
import { changeDateFormat } from "@/utils/dateUtils";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const SingleNews = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { slug, ncc } = useParams();

  const { news, single_news, single_news_loading } = useSelector(
    (state) => state.homepage
  );
  const recentNews = news?.data
    ?.filter((list) => list?.slug !== slug)
    .slice(0, 4);

  useEffect(() => {
    dispatch(getSingleNews(slug));
    dispatch(getAllNews({ type: "ncc", id: user?.id }));
    dispatch(getNewsCategory());
  }, [slug]);
  useEffect(() => {
    dispatch(getSingleNCC(ncc));
  }, [ncc]);
  return (
    <>
      {/* <SecondaryNav
        id={ncc}
        category={news_category}
        setSelected={setSelected}
        selected={selected}
        news
        color={single_ncc?.color}
      /> */}

      <div className="container">
        {single_news_loading ? (
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
                        src={single_news?.feature_image}
                        alt={single_news?.title}
                      />
                    </div>
                    <div className="single_news_page_title">
                      {single_news?.title}
                    </div>

                    <div className="single_news_page_date">
                      {changeDateFormat(
                        single_news?.created_at,
                        "DD-MMM-YYYY HH:MM"
                      )}{" "}
                      | Created by: {single_news?.created_by?.full_name}
                    </div>

                    <div
                      className="single_news_page_long"
                      dangerouslySetInnerHTML={{
                        __html: single_news?.description,
                      }}
                    ></div>
                  </>
                </div>
              </Grid>
              <Grid item md={4} sm={12} className="recent_news">
                <div className="single_news_page_sidebar">
                  <div className="recent_news">
                    <div className="recent_news_title">Recent News</div>
                    {recentNews?.length > 0 ? (
                      recentNews.map((recent) => (
                        <Link
                          key={recent.id}
                          href={`/news/${recent?.slug}`}
                          className="recent_news_item"
                        >
                          <div className="img_wrapper">
                            <img src={recent?.feature_image} alt="" />
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
                        <h3 className="text-center">No News available.</h3>
                      </div>
                    )}
                    <div className="button_wrap">
                      <Link href={`/news`} className="btn-sm">
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

export default SingleNews;

{
  /* <div className="main_content">
  <div className="container">
    <div className="single_event_page">
      <div className="single_event_page_content">
        <div className="single_event_page_imgwrap">
          <img src={single_news?.feature_image} alt={single_news?.title} />
        </div>
        <div className="single_event_page_title">{single_news?.title}</div>
        <div className="single_event_page_date">
          {changeDateFormat(single_news?.created_at)} | Created by:{' '}
          {single_news?.created_by?.full_name}
        </div>
        <div className="single_event_page_short">
          <div
            className="about_description_single"
            dangerouslySetInnerHTML={{ __html: single_news?.description || '' }}
          />
        </div>
        {/* {news?.gallery && news?.gallery?.length > 0 && (
        <div className="container">
          <div className="singleEventSlider">
            {news?.gallery.map((image, index) => (
              <div key={index}>
                <div className="slider_imgwrapper">
                  <img src={image?.path} alt={`Image`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )} 
       
      </div>
      <div className="single_event_page_sidebar">
        <div className="recent_events">
          <div className="recent_events_title">Recent News</div>
          {recentNews?.length > 0 ? (
            recentNews.map((recent) => (
              <Link
                key={recent.id}
                href={`/ncc/${ncc}/news/${recent?.slug}`}
                className="recent_events_item">
                <div className="img_wrapper">
                  <img src={recent?.feature_image} alt="" />
                </div>
                <div className="item_content">
                  <div className="item_content_title">{recent?.title}</div>
                  <div className="item_content_date">{recent?.created_date}</div>
                </div>
              </Link>
            ))
          ) : (
            <div className="button_wrap">
              <h3 className="text-center">No News available.</h3>
            </div>
          )}
          <div className="button_wrap">
            <Link href={`/ncc/${ncc}/news`} className="btn-sm">
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> */
}
