import {
  getAllEvents,
  getEventsCategory,
  getSingleEvent,
} from "@/redux/homepage/actions";
import { changeDateFormat } from "@/utils/dateUtils";
import { Box, CircularProgress, Grid } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondaryNav from "../SecondaryNav";

const SingleEvent = () => {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();

  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { events, single_event, single_event_loading, events_category } =
    useSelector((state) => state.homepage);

  const recentEvent = events?.data
    ?.filter((list) => list?.slug != slug)
    ?.slice(0, 4);
  const [selected, setSelected] = useState(
    single_event?.event_category_id
      ? parseInt(single_event?.event_category_id)
      : events_category?.[0]?.id
  );

  useEffect(() => {
    slug && dispatch(getSingleEvent(slug));
  }, [slug]);
  useEffect(() => {
    dispatch(getAllEvents());
    dispatch(getEventsCategory());
  }, []);

  return (
    <>
      <SecondaryNav
        category={events_category}
        setSelected={setSelected}
        selected={selected}
      />

      <div className="container">
        {single_event_loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "60vh" }}
          >
            <CircularProgress size={30} />
          </Box>
        ) : (
          <div className="single_event_page">
            <Grid container className="event_main_grid">
              <Grid item md={8}>
                <div className="single_event_page_content">
                  <>
                    <div className="single_event_page_title">
                      {single_event?.title}
                    </div>
                    <div className="single_event_page_date">
                      {changeDateFormat(
                        single_event?.created_at,
                        "DD-MMM-YYYY HH:MM"
                      )}
                    </div>
                    <div className="single_event_page_imgwrap">
                      <img
                        src={single_event?.feature_image}
                        alt={single_event?.title}
                      />
                    </div>
                    <div className="event_list_wrapper">
                      <Grid container>
                        <Grid item lg={6}>
                          <ul className="event_list">
                            <li>
                              <div className="title">Location :</div>
                              <div className="value">
                                {single_event?.location}
                              </div>
                            </li>
                            <li>
                              <div className="title">Venue :</div>
                              <div className="value">{single_event?.venue}</div>
                            </li>
                            <li>
                              <div className="title">Date :</div>
                              <div className="value">
                                {changeDateFormat(single_event?.event_date)}
                              </div>
                            </li>
                          </ul>
                        </Grid>
                        <Grid item lg={6}>
                          <ul className="event_list">
                            <li>
                              <div className="title">Time :</div>
                              <div className="value">
                                {single_event?.event_time}
                              </div>
                            </li>
                            <li>
                              <div className="title">Contact :</div>
                              <div className="value">
                                {single_event?.contact_phone}
                              </div>
                            </li>
                            <li>
                              <div className="title">Email :</div>
                              <div className="value">
                                {single_event?.contact_email}
                              </div>
                            </li>
                          </ul>
                        </Grid>
                      </Grid>
                    </div>

                    {/* <div className="single_event_page_short">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book.
            </div> */}

                    <div
                      className="single_event_page_long"
                      dangerouslySetInnerHTML={{
                        __html: single_event?.description,
                      }}
                    />
                    <div className="map-container">
                      <Grid container style={{ width: "100%" }}>
                        <Grid item lg={12} className="map-container_item map">
                          {single_event?.map_url && (
                            <div style={{ width: "100%", height: "290px" }}>
                              <div
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  overflow: "hidden",
                                }}
                                dangerouslySetInnerHTML={{
                                  __html: single_event?.map_url,
                                }}
                              />
                            </div>
                          )}
                        </Grid>

                        <Grid
                          item
                          lg={12}
                          className="map-container_item tube"
                          sx={{ marginTop: "20px" }}
                        >
                          {single_event?.youtube_url && (
                            <div style={{ width: "100%", height: "290px" }}>
                              <iframe
                                width="100%"
                                height="290"
                                src={`https://www.youtube.com/embed/${single_event?.youtube_url}`}
                                // src={`https://www.youtube.com/embed/${youtubeLink}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                              ></iframe>
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </div>
                  </>
                </div>
              </Grid>
              <Grid item md={4} className="recent_event">
                <div className="single_event_page_sidebar">
                  <div className="recent_events">
                    <div className="recent_events_title">Recent Event</div>
                    {recentEvent?.length > 0 ? (
                      recentEvent?.map((recent) => (
                        <Link
                          key={recent.id}
                          href={`/events/${recent?.slug}`}
                          className="recent_events_item"
                        >
                          <div className="img_wrapper">
                            <img src={recent?.feature_image} alt="" />
                          </div>
                          <div className="item_content">
                            <div className="item_content_title">
                              {recent?.title}
                            </div>
                            <div className="item_content_date">
                              {changeDateFormat(recent?.created_at)}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="button_wrap">
                        <h3 className="text-center">No Event available.</h3>
                      </div>
                    )}
                    <div className="button_wrap">
                      <Link href="/events" className="btn-sm">
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

export default SingleEvent;
