import {
  getAllNews,
  getNewsCategory,
  getSingleNews,
  getSingleUser,
} from "@/redux/homepage/actions";
import { changeDateFormat } from "@/utils/dateUtils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SecondaryNav from "./SecondaryNav";

const SingleNews = () => {
  // const news = {
  //   id: '1',
  //   featureImage: Banner,
  //   name: 'John Doe',
  //   slug: 'first_news_slug',
  //   title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  //   excerpt:
  //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  // };
  // const recentNews = [
  //   {
  //     id: '1',
  //     image: CandidateImage1,
  //     name: 'John Doe',
  //     slug: 'first_news_slug',
  //     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',

  //     excerpt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  //   },
  //   {
  //     id: 2,
  //     image: CandidateImage2,
  //     name: 'Jason Momoa',
  //     slug: 'second_news_slug',
  //     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',

  //     excerpt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  //   },
  //   {
  //     id: 3,
  //     image: CandidateImage3,
  //     name: 'Chris Bumsterd',
  //     slug: 'third_news_slug',
  //     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',

  //     excerpt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  //   }
  // ];

  const dispatch = useDispatch();

  const { slug, candidate } = useParams();

  const { news, news_category, single_news, single_user } = useSelector(
    (state) => state.homepage
  );
  const recentNews = news?.data
    ?.filter((list) => list?.slug !== slug)
    .slice(0, 4);

  const [selected, setSelected] = useState(
    single_news?.news_category_id
      ? parseInt(single_news?.news_category_id)
      : news_category?.[0]?.id
  );

  useEffect(() => {
    dispatch(getSingleUser(candidate));

    dispatch(getSingleNews(slug));
    dispatch(getAllNews({ type: single_user?.role_name, id: single_user?.id }));
    dispatch(getNewsCategory());
  }, [slug]);

  return (
    <>
      <SecondaryNav
        id={candidate}
        category={news_category}
        setSelected={setSelected}
        selected={selected}
      />
      <div className="main_content">
        <div className="container">
          <div className="single_event_page">
            <div className="single_event_page_content">
              <div className="single_event_page_title">
                {single_news?.title}
              </div>
              <div className="single_event_page_date">
                {" "}
                {changeDateFormat(single_news?.created_at)}
              </div>
              <div className="single_event_page_imgwrap">
                <img
                  src={single_news?.feature_image}
                  alt={single_news?.title}
                />
              </div>
              <div className="single_event_page_short">
                <div
                  className="mission_description"
                  dangerouslySetInnerHTML={{ __html: single_news?.description }}
                ></div>
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
              )} */}
              {/* <div className="single_event_page_long">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </div> */}
            </div>
            <div className="single_event_page_sidebar">
              <div className="recent_events">
                <div className="recent_events_title">Recent News</div>
                {recentNews?.length > 0 ? (
                  recentNews.map((recent) => (
                    <Link
                      key={recent.id}
                      href={`/${candidate}/news/${recent?.slug}`}
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
                  <Link href={`/our-team/${candidate}/news`} className="btn-sm">
                    View All
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleNews;
