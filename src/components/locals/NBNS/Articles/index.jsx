import NewsCard from "@/components/globals/NewsCard";
import NewsCardOrderOne from "@/components/globals/NewsCardOrderOne";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getArticles } from "@/redux/homepage/actions";
import { Button } from "@mui/base";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import NewsCard from '../../globals/NewsCard';
import SecondaryNav from "./SecondaryNav";

const Article = () => {
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();

  const { article, article_loading } = useSelector((state) => state.homepage);

  const [allFilteredArticle, setAllFilteredArticle] = useState();
  const [articleLimit, setArticleLimit] = useState(7);

  const [search, setSearch] = useState("");

  const debouncedSearchQuery = useDebouncedValue(search, 500);

  useEffect(() => {
    const finalData = {
      limit: articleLimit,
      status: 1,
      query: debouncedSearchQuery,
    };

    dispatch(getArticles(finalData));
  }, [articleLimit, debouncedSearchQuery]);

  useEffect(() => {
    if (article?.data) {
      const allNewArticle = article?.data?.filter((list) =>
        list?.title?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setAllFilteredArticle(allNewArticle);
    }
  }, [search, article?.data]);

  // useEffect(() => {
  //   if (article) {
  //     const newArticle = news?.data?.filter(
  //       (list) => list?.title?.toLowerCase()?.includes(search?.toLowerCase())
  //       //  &&
  //       // list?.news_category_id == Number(selected)
  //     );
  //     setFilteredArticle(selected === 'ALL' ? news?.data : newNews);
  //   }
  // }, [search, news, selected, news_category]);

  const handleShowMore = () => {
    setArticleLimit((prev) => prev + 4);
  };

  return (
    <>
      <SecondaryNav
        // category={news_category}
        // setSelected={setSelected}
        // selected={selected}
        setSearch={setSearch}
      />
      <section className="all_news" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="row">
            {allFilteredArticle?.length > 0 ? (
              <>
                <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
                  <Grid item className="col-md-12 col-xl-5 main_card_news">
                    {allFilteredArticle?.slice(0, 1)?.map((item) => (
                      <NewsCardOrderOne
                        gridOne
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.article_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.author}
                        featuredTitle={"Article"}
                        linkUrl={`/nbns/articles/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid item className="col-md-12 col-xl-7">
                    <Grid container spacing={0} item>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredArticle?.slice(1, 2)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.article_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author}
                            linkUrl={`/nbns/articles/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredArticle?.slice(2, 3)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.article_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author}
                            linkUrl={`/nbns/articles/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredArticle?.slice(3, 4)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.article_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author}
                            linkUrl={`/nbns/articles/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredArticle?.slice(4, 5)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.article_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author}
                            linkUrl={`/nbns/articles/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile_fifth"
                      >
                        {allFilteredArticle?.slice(5, 6)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.article_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author}
                            linkUrl={`/nbns/articles/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12 col-sm-6 col-sm-6 col-md-4 col-lg-4"
                      >
                        {allFilteredArticle?.slice(6, 7)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.article_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.author}
                            linkUrl={`/nbns/articles/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {allFilteredArticle?.slice(7)?.map((item) => (
                  <NewsCard
                    key={item.id}
                    news={item}
                    linkUrl={`/nbns/articles/${item?.slug}`}
                    image={item?.feature_image}
                    title={item?.title}
                    excerpt={item?.excerpt}
                    author={item?.created_by?.full_name}
                    featuredTitle={"News"}
                    belowNews
                  />
                ))}
                {article?.meta?.to !== article?.meta?.total &&
                  !article_loading && (
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
          {article_loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={24} />
            </Box>
          ) : (
            allFilteredArticle?.length === 0 && (
              <div className="col-md-12 mt-5 mb-5">
                <h3 className="text-center">No article available</h3>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Article;
