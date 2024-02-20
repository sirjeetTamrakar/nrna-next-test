import NewsCardOrderOne from "@/components/globals/NewsCardOrderOne";
import { stringifyData } from "@/helpers";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getAllNews, getNewsCategory } from "@/redux/homepage/actions";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsCard from "../../globals/NewsCard";
import SecondaryNav from "./SecondaryNav";

const News = () => {
  // const location = useLocation();
  const Router = useRouter();
  const location = Router?.query;
  console.log({ Router });
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();
  const { news, news_loading, news_category, news_category_loading } =
    useSelector((state) => state.homepage);

  const [filteredNews, setFilteredNews] = useState();
  const [newsLimit, setNewsLimit] = useState(15);

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

  const debouncedSearchQuery = useDebouncedValue(search, 500);
  useEffect(() => {
    const finalData = {
      limit: newsLimit,
      category_id: location?.state === "ALL" ? "" : Number(location?.state),
      status: 1,
      query: debouncedSearchQuery,
    };
    dispatch(getAllNews(finalData));
  }, stringifyData([newsLimit, debouncedSearchQuery, location?.state]));

  useEffect(() => {
    dispatch(getNewsCategory());
  }, [dispatch]);

  // useEffect(() => {
  //   if (news) {
  //     const allNewNews = news?.data?.filter((list) =>
  //       list?.title?.toLowerCase()?.includes(search?.toLowerCase())
  //     );
  //     setAllFilteredNews(allNewNews);
  //   }
  // }, [search, news]);

  useEffect(() => {
    if (news) {
      const newNews = news?.data?.filter(
        (list) =>
          list?.title?.toLowerCase()?.includes(search?.toLowerCase()) &&
          list?.news_category_id == Number(selected)
      );
      setFilteredNews(selected === "ALL" ? news?.data : newNews);
    }
  }, [search, news, selected, news_category]);

  const handleShowMore = () => {
    setNewsLimit((prev) => prev + 12);
  };

  return (
    <>
      <SecondaryNav
        category={news_category}
        setSelected={setSelected}
        selected={selected}
        setSearch={setSearch}
      />
      <section className="all_news" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="row">
            {filteredNews?.length > 0 ? (
              <>
                <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
                  <Grid item className="col-md-12 col-xl-5 main_card_news">
                    {filteredNews?.slice(0, 1)?.map((item) => (
                      <NewsCardOrderOne
                        gridOne
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.feature_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.author ?? "NBNS Global"}
                        featuredTitle={"News"}
                        linkUrl={`/news/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid item className="col-md-12 col-xl-7">
                    <Grid container spacing={0} item>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {filteredNews?.slice(1, 2)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.feature_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author ?? "NBNS Global"}
                            featuredTitle={"News"}
                            linkUrl={`/news/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {filteredNews?.slice(2, 3)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.feature_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author ?? "NBNS Global"}
                            featuredTitle={"News"}
                            linkUrl={`/news/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {filteredNews?.slice(3, 4)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.feature_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author ?? "NBNS Global"}
                            featuredTitle={"News"}
                            linkUrl={`/news/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {filteredNews?.slice(4, 5)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.feature_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author ?? "NBNS Global"}
                            featuredTitle={"News"}
                            linkUrl={`/news/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile_fifth"
                      >
                        {filteredNews?.slice(5, 6)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.feature_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author ?? "NBNS Global"}
                            featuredTitle={"News"}
                            linkUrl={`/news/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12 col-sm-6 col-sm-6 col-md-4 col-lg-4"
                      >
                        {filteredNews?.slice(6, 7)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.feature_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author ?? "NBNS Global"}
                            featuredTitle={"News"}
                            linkUrl={`/news/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {filteredNews?.slice(7)?.map((item) => (
                  <NewsCard
                    key={item.id}
                    news={item}
                    linkUrl={`/news/${item?.slug}`}
                    image={item?.feature_image}
                    title={item?.title}
                    excerpt={item?.excerpt}
                    author={item?.author ?? "NBNS Global"}
                    featuredTitle={"News"}
                    belowNews
                  />
                ))}
                {news?.meta?.to !== news?.meta?.total &&
                  !(news_loading || news_category_loading) && (
                    <div
                      style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        style={{
                          border: "none",
                          backgroundColor: "#E1F5FF",
                          color: "#6F83CE",
                          padding: "10px 20px",
                          borderRadius: "4px",
                        }}
                        onClick={handleShowMore}
                      >
                        Show More
                      </Button>
                    </div>
                  )}
              </>
            ) : (
              ""
            )}
          </div>
          {news_loading || news_category_loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={24} />
            </Box>
          ) : (
            filteredNews?.length === 0 && (
              <div className="col-md-12 mt-5 mb-5">
                <h3 className="text-center">No news available</h3>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default News;
