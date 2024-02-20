import SecondaryNav from "@/components/locals/News/SecondaryNav";
import { getAllNews, getNewsCategory } from "@/redux/homepage/actions";
import { changeDateFormat } from "@/utils/dateUtils";
import { CircularProgress, Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SingleNews = ({ single_news }) => {
  const dispatch = useDispatch();
  const location = useRouter();
  const { slug } = location.query;

  useEffect(() => {
    dispatch(getAllNews());
    dispatch(getNewsCategory());
  }, [slug, dispatch]);

  const { news, news_category, single_news_loading } = useSelector(
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

  return (
    <>
      <Head>
        <meta property="og:description" content={single_news?.excerpt} />
        <meta property="og:image" content={single_news?.feature_image} />
        <meta property="og:title" content={single_news?.title} />
        <meta
          property="og:url"
          content={`https://nrna-next-test.vercel.app/news/${single_news?.slug}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={single_news?.title} />
        <meta name="twitter:description" content={single_news?.excerpt} />
        <meta name="twitter:image" content={single_news?.feature_image} />
        <meta
          name="twitter:url"
          content={`https://nrna-next-test.vercel.app/news/${single_news?.slug}`}
        />
      </Head>

      <SecondaryNav
        category={news_category}
        setSelected={setSelected}
        selected={selected}
      />

      <div className="container">
        {single_news_loading ? (
          <CircularProgress />
        ) : (
          <div className="single_news_page">
            <Grid container className="news_main_grid">
              <Grid item md={8}>
                <div className="single_news_page_content">
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
                    | Author: {single_news?.author ?? "NBNS Global"}
                  </div>
                  <div
                    className="single_news_page_long"
                    dangerouslySetInnerHTML={{
                      __html: single_news?.description,
                    }}
                  />
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

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.nrnaglobal.com/api/news/${params?.slug}`)
    .then((response) => response.json())
    .then((json) => json);

  return {
    props: {
      single_news: res?.data,
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://api.nrnaglobal.com/api/news")
    .then((response) => response.json())
    .then((json) => json);

  const paths = res?.data?.map((item) => ({
    params: {
      slug: item?.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}
