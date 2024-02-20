import { Grid } from "@mui/material";
import Link from "next/link";
import NewsCard from "./NewsCard";
import NewsCardOrderOne from "./NewsCardOrderOne";

const NewsSection = ({
  image,
  linkUrl,
  title = "Latest News",
  about,
  data,
  loading,
}) => {
  return (
    <section className="about" id="about_main">
      <div className="container">
        <div>
          <div className="" id="about-section">
            <div className="about_title">{title}</div>

            <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
              <Grid
                item
                className="col-md-12 col-xl-5 main_card_news"
                sx={{ marginBottom: "20px" }}
              >
                {data?.data?.slice(0, 1)?.map((item) => (
                  <NewsCardOrderOne
                    gridOne
                    gridLayout
                    key={item.id}
                    news={item}
                    image={item?.feature_image}
                    title={item?.title}
                    excerpt={item?.excerpt}
                    author={item?.created_by?.full_name}
                    featuredTitle={"News"}
                    linkUrl={`/news/${item?.slug}`}
                  />
                ))}
              </Grid>
              <Grid item className="col-md-12 col-xl-7">
                <Grid container spacing={0} item>
                  <Grid
                    sx={{ marginBottom: "20px" }}
                    item
                    className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                  >
                    {data?.data?.slice(1, 2)?.map((item) => (
                      <NewsCard
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.feature_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.created_by?.full_name}
                        featuredTitle={"News"}
                        linkUrl={`/news/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid
                    sx={{ marginBottom: "20px" }}
                    item
                    className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                  >
                    {data?.data?.slice(2, 3)?.map((item) => (
                      <NewsCard
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.feature_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.created_by?.full_name}
                        featuredTitle={"News"}
                        linkUrl={`/news/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid
                    sx={{ marginBottom: "20px" }}
                    item
                    className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                  >
                    {data?.data?.slice(3, 4)?.map((item) => (
                      <NewsCard
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.feature_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.created_by?.full_name}
                        featuredTitle={"News"}
                        linkUrl={`/news/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid
                    sx={{ marginBottom: "20px" }}
                    item
                    className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile"
                  >
                    {data?.data?.slice(4, 5)?.map((item) => (
                      <NewsCard
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.feature_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.created_by?.full_name}
                        featuredTitle={"News"}
                        linkUrl={`/news/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid
                    sx={{ marginBottom: "20px" }}
                    item
                    className="col-12  col-sm-6 col-sm-6 col-md-4 col-lg-4 news_card_mobile_fifth"
                  >
                    {data?.data?.slice(5, 6)?.map((item) => (
                      <NewsCard
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.feature_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.created_by?.full_name}
                        featuredTitle={"News"}
                        linkUrl={`/news/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                  <Grid
                    sx={{ marginBottom: "20px" }}
                    sssss
                    item
                    className="col-12 col-sm-6 col-sm-6 col-md-4 col-lg-4"
                  >
                    {data?.data?.slice(6, 7)?.map((item) => (
                      <NewsCard
                        gridLayout
                        key={item.id}
                        news={item}
                        image={item?.feature_image}
                        title={item?.title}
                        excerpt={item?.excerpt}
                        author={item?.created_by?.full_name}
                        featuredTitle={"News"}
                        linkUrl={`/news/${item?.slug}`}
                      />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid container spacing={0}>
              {data?.data?.slice(0, 8)?.map((item) => (
                <Grid
                  key={item.id}
                  item
                  className="col-12 col-sm-6 col-sm-6 col-md-4 col-lg-3 news_card_mobile">
                  <NewsCard
                    gridLayout
                    news={item}
                    image={item?.feature_image}
                    title={item?.title}
                    excerpt={item?.excerpt}
                    author={item?.created_by?.full_name}
                    featuredTitle={'News'}
                    linkUrl={`/news/${item?.slug}`}
                    belowNews
                  />
                </Grid>
              ))}
            </Grid> */}
            <Link href={linkUrl || `/news`} className="view_more">
              View More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
