import NewsCard from "@/components/globals/NewsCard";
import { stringifyData } from "@/helpers";
import {
  getAllNews,
  getNewsCategory,
  getSingleNCC,
  resetNewsState,
} from "@/redux/homepage/actions";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondaryNav from "./SecondaryNav";

const News = () => {
  const dispatch = useDispatch();

  const Router = useRouter();
  const location = Router?.query;
  const {
    news,
    news_loading,
    news_category,
    news_category_loading,
    single_ncc,
  } = useSelector((state) => state.homepage);
  const { ncc } = useRouter()?.query;
  const [filteredNews, setFilteredNews] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(
      location?.state
        ? location?.state === "ALL"
          ? "ALL"
          : Number(location?.state)
        : selected
        ? selected
        : "ALL"
    );
  }, stringifyData([location?.state, news_category]));
  const [search, setSearch] = useState("");
  useEffect(() => {
    single_ncc?.id && dispatch(getAllNews({ type: "ncc", id: single_ncc?.id }));
  }, [single_ncc?.id]);

  useEffect(() => {
    ncc && dispatch(getSingleNCC(ncc));
  }, [ncc]);

  useEffect(() => {
    dispatch(getNewsCategory());
    dispatch(resetNewsState());
  }, []);

  useEffect(() => {
    if (news) {
      const newNews = news?.data?.filter(
        (list) =>
          list?.title?.toLowerCase()?.includes(search?.toLowerCase()) &&
          list?.news_category_id == Number(selected)
      );
      setFilteredNews(selected === "ALL" ? news?.data : newNews);
    }
  }, [search, news?.data, selected, news_category]);

  return (
    <>
      <SecondaryNav
        category={news_category}
        setSelected={setSelected}
        selected={selected}
        setSearch={setSearch}
        id={ncc}
        color={"#fff"}
        news
        data={news?.data}
      />
      <div className="main_content">
        <section className="all_events">
          {/* <div className="all_events_title">News</div> */}
          <div className="container">
            <div className="row">
              {filteredNews?.length > 0
                ? filteredNews?.map((newsItem) => (
                    <NewsCard
                      key={newsItem.id}
                      news={newsItem}
                      title={newsItem?.title}
                      image={newsItem?.feature_image}
                      author={newsItem?.created_by?.full_name}
                      excerpt={newsItem?.excerpt}
                      linkUrl={`/ncc/${ncc}/news/${newsItem?.slug}`}
                    />
                  ))
                : ""}
            </div>
            {news_loading || news_category_loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={24} />
              </Box>
            ) : (
              filteredNews?.length === 0 && (
                <div className="col-md-12 mt-5 mb-5">
                  <h3 className="text-center">No News available</h3>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default News;
