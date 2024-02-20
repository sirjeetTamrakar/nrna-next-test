import NewsCard from "@/components/globals/NewsCard";
import NewsCardOrderOne from "@/components/globals/NewsCardOrderOne";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { getPressRelease } from "@/redux/homepage/actions";
import { Button } from "@mui/base";
import { Box, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import NewsCard from '../../globals/NewsCard';
import SecondaryNav from "./SecondaryNav";

const PressRelease = () => {
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();

  const { press_release, press_release_loading } = useSelector(
    (state) => state.homepage
  );

  const [allFilteredPressRelease, setAllFilteredPressRelease] = useState();
  const [pressLimit, setPressLimit] = useState(7);

  const [search, setSearch] = useState("");

  const debouncedSearchQuery = useDebouncedValue(search, 500);

  useEffect(() => {
    const finalData = {
      limit: pressLimit,
      status: 1,
      query: debouncedSearchQuery,
    };

    dispatch(getPressRelease(finalData));
  }, [pressLimit, debouncedSearchQuery]);

  useEffect(() => {
    if (press_release?.data) {
      const allNewPressRelease = press_release?.data?.filter((list) =>
        list?.title?.toLowerCase()?.includes(search?.toLowerCase())
      );
      setAllFilteredPressRelease(allNewPressRelease);
    }
  }, [search, press_release?.data]);

  const handleShowMore = () => {
    setPressLimit((prev) => prev + 4);
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
            {allFilteredPressRelease?.length > 0 ? (
              <>
                <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
                  <Grid item className="col-md-12 col-xl-5 main_card_news">
                    {allFilteredPressRelease?.slice(0, 1)?.map((item) => (
                      <NewsCardOrderOne
                        gridOne
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.press_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.user}
                        featuredTitle={"Press Release"}
                        linkUrl={`/nbns/press-release/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid item className="col-md-12 col-xl-7">
                    <Grid container spacing={0} item>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredPressRelease?.slice(1, 2)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.press_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.user}
                            linkUrl={`/nbns/press-release/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredPressRelease?.slice(2, 3)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.press_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.user}
                            linkUrl={`/nbns/press-release/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredPressRelease?.slice(3, 4)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.press_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.user}
                            linkUrl={`/nbns/press-release/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                      >
                        {allFilteredPressRelease?.slice(4, 5)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.press_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.user}
                            linkUrl={`/nbns/press-release/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile_fifth"
                      >
                        {allFilteredPressRelease?.slice(5, 6)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.press_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.user}
                            linkUrl={`/nbns/press-release/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                      <Grid
                        item
                        className="col-12 col-sm-6 col-sm-6 col-md-4 col-lg-4"
                      >
                        {allFilteredPressRelease?.slice(6, 7)?.map((item) => (
                          <NewsCard
                            gridLayout
                            key={item.id}
                            news={item}
                            image={item?.press_image}
                            title={item?.title}
                            excerpt={item?.excerpt}
                            author={item?.user}
                            linkUrl={`/nbns/press-release/${item?.slug}`}
                          />
                        ))}
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {allFilteredPressRelease?.slice(7)?.map((item) => (
                  <NewsCard
                    key={item.id}
                    news={item}
                    linkUrl={`/nbns/press-release/${item?.slug}`}
                    image={item?.feature_image}
                    title={item?.title}
                    excerpt={item?.excerpt}
                    author={item?.created_by?.full_name}
                    featuredTitle={"Press Release"}
                    belowNews
                  />
                ))}
                {press_release?.meta?.to !== press_release?.meta?.total &&
                  !press_release_loading && (
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
          {press_release_loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={24} />
            </Box>
          ) : (
            allFilteredPressRelease?.length === 0 && (
              <div className="col-md-12 mt-5 mb-5">
                <h3 className="text-center">No press release available</h3>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default PressRelease;
