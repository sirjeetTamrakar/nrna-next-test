import NewsCard from "@/components/globals/NewsCard";
import {
  getAllNews,
  getNewsCategory,
  getSingleUser,
} from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondaryNav from "./SecondaryNav";

const News = () => {
  // const news = [
  //   {
  //     id: '1',
  //     featureImage: CandidateImage1,
  //     name: 'John Doe',
  //     slug: 'first_news_slug',
  //     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',

  //     excerpt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  //   },
  //   {
  //     id: 2,
  //     featureImage: CandidateImage2,
  //     name: 'Jason Momoa',
  //     slug: 'second_news_slug',
  //     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',

  //     excerpt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  //   },
  //   {
  //     id: 3,
  //     featureImage: CandidateImage3,
  //     name: 'Chris Bumsterd',
  //     slug: 'third_news_slug',
  //     title: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',

  //     excerpt:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  //   }
  // ];

  const dispatch = useDispatch();
  const { candidate } = useRouter()?.query;

  const location = useRouter();

  const { news, news_category, single_user } = useSelector(
    (state) => state.homepage
  );
  const [filteredNews, setFilteredNews] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(location?.state ? location?.state : news_category?.[0]?.id);
  }, [location?.state, news_category]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    candidate && dispatch(getSingleUser(candidate));
  }, [candidate]);
  useEffect(() => {
    single_user &&
      dispatch(
        getAllNews({
          user_id: single_user?.id,
          limit: 100,
        })
      );
  }, [single_user]);
  useEffect(() => {
    dispatch(getNewsCategory());
  }, []);

  useEffect(() => {
    if (news) {
      const newNews = news?.data?.filter(
        (list) =>
          list?.title?.toLowerCase()?.includes(search?.toLowerCase()) &&
          list?.news_category_id == Number(selected)
      );
      setFilteredNews(newNews);
    }
  }, [search, news, selected, news_category]);

  return (
    <>
      <SecondaryNav
        category={news_category}
        setSelected={setSelected}
        selected={selected}
        setSearch={setSearch}
        id={candidate}
      />
      <div className="main_content">
        <section className="all_events">
          {/* <div className="contact_page_title">News</div> */}
          <div className="container">
            <div className="row">
              {filteredNews?.length > 0 ? (
                filteredNews.map((newsItem) => (
                  <NewsCard
                    key={newsItem.id}
                    news={newsItem}
                    linkUrl={`/${candidate}/news/${newsItem?.slug}`}
                  />
                ))
              ) : (
                <div className="col-md-12 mt-5 mb-5">
                  <h3 className="text-center">No news available.</h3>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
