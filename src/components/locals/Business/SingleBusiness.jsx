import facebook from "@/assets/images/facebook.png";
import insta from "@/assets/images/insta.png";
import linkedin from "@/assets/images/linkedin.png";
import { LIVE_BASE_URL } from "@/helpers";
import useScreenSize from "@/hooks/useScreenSize";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Box, Grid } from "@mui/material";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import About from "./About";

const BusinessProfile = ({ single_business = {} }) => {
  console.log("🚀 ~ BusinessProfile ~ single_business:", single_business);
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const router = useRouter();
  const { slug } = router?.query;
  const screenSize = useScreenSize();

  const [filteredSingleBusiness, setFilteredSingleBusiness] = useState();
  const { business_category } = useSelector((state) => state.homepage);
  useEffect(() => {
    const filteredSingleCategoryData = business_category?.filter(
      (item) => item?.id === Number(single_business?.business_category_id)
    );
    const newObj = {};

    filteredSingleCategoryData.forEach((item, index) => {
      newObj[`category${index + 1}`] = item;
    });
    setFilteredSingleBusiness(newObj);
  }, [business_category]);

  // useEffect(() => {
  //   slug && dispatch(getSingleBusiness(slug));
  // }, [slug]);
  // useEffect(() => {
  //   dispatch(getBusinessCategory());
  // }, []);

  return (
    <>
      <Head>
        <meta name="og:description" content={single_business?.excerpt} />
        <meta property="og:image" content={single_business?.feature_image} />
        <meta property="og:title" content={single_business?.title} />

        <meta
          property="og:url"
          content={`https://nrna-next-test.vercel.app/news/${single_business?.slug}`}
        />
        <meta property="og:type" content="article" />
        <title>{single_business?.title}</title>
        <meta name="description" content={single_business?.excerpt} />

        <meta property="author" content={single_business?.author} />
        <meta name="twitter:card" content={"summary_large_image"} />
        <meta name="twitter:title" content={single_business?.title} />
        <meta name="twitter:description" content={single_business?.excerpt} />
        <meta name="twitter:image" content={single_business?.feature_image} />
        <meta
          name="twitter:url"
          content={`https://nrna-next-test.vercel.app/news/${single_business?.slug}`}
        />
      </Head>
      <div className="main_content">
        <div
          className="candidate_page_banner"
          style={{
            // backgroundImage: `url('${candidateImages?.profileBannerImage}')`,
            backgroundImage: `url('${single_business?.banner_image}')`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
        {/* <BannerBusinessSection
        banners={single_business?.banner_image}
        data={single_business}
        singleBanner
      /> */}

        <div className="container">
          <div className="candidate_page">
            <div className="candidate_page_lower_banner">
              <div
                className={`${
                  screenSize?.width < 993
                    ? "business_page_lower_banner_wrapper"
                    : "candidate_page_lower_banner_wrapper"
                }`}
              >
                <div className="candidate_page_lower_banner_wrapper_box">
                  <div className="img_container">
                    <img src={single_business?.image} alt="" />
                  </div>
                  <div
                    className={`${
                      screenSize?.width < 993
                        ? "business_name_box"
                        : "candidate_name_box"
                    }`}
                  >
                    <div className="candidate_name">
                      {single_business?.fullname}
                    </div>
                    <div className="candidate_designation">
                      {filteredSingleBusiness?.category1?.title}
                    </div>
                  </div>
                </div>
              </div>
              <div className="candidate_social">
                <div
                  className={`${
                    screenSize?.width < 993
                      ? "business_social_wrapper_box"
                      : "candidate_social_wrapper_box"
                  }`}
                >
                  <div className="candidate_social_wrapper">
                    <a
                      href={single_business?.facebook_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="candidate_social_icons_box">
                        <Image
                          src={facebook}
                          alt=""
                          className="candidate_social_icons"
                        />
                      </div>
                    </a>
                    <div className="candidate_social_icons_box">
                      <a
                        href={single_business?.instagram_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src={insta}
                          alt=""
                          className="candidate_social_icons"
                        />
                      </a>
                    </div>
                    <div className="candidate_social_icons_box">
                      <a
                        href={single_business?.twitter_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src={linkedin}
                          alt=""
                          className="candidate_social_icons"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <hr className="business_horizontaline" />
            </div>
            <div className="candidate_page_wrapper">
              <Grid container spacimg={2}>
                <Grid item className="col-md-5" sx={{ width: "100%" }}>
                  <div className="candidate_page_sidebar">
                    <ul className="contact_list">
                      <li className="contact_list_title_box">
                        {" "}
                        <PermContactCalendarIcon />
                        <span className="contact_list_title">
                          Contact Details
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">
                          Email Address
                        </div>
                        <span className="contact_list_item">
                          {single_business?.email ?? ""}
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">Phone no.</div>
                        <span className="contact_list_item">
                          {single_business?.phone ?? ""}
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">Address</div>
                        <span className="contact_list_item">
                          {single_business?.address ?? ""}
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">Map</div>
                        <div
                          style={{
                            marginTop: "10px",
                            width: "100%",
                            height: "300px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              overflow: "hidden",
                            }}
                            dangerouslySetInnerHTML={{
                              __html: single_business?.google_map_link,
                            }}
                          />
                        </div>
                        {/* <span className="contact_list_item">{candidateData?.address ?? ''}</span> */}
                        {/* <iframe
                          width="100%"
                          height="220"
                          frameBorder="0"
                          allowFullScreen
                          src={single_business?.google_map_link}></iframe> */}
                      </li>
                    </ul>
                    {/* <div className="social_links">
                <a href={candidateData?.facebook ?? '#'} target="_blank" rel="noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href={candidateData?.instagram ?? '#'} target="_blank" rel="noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href={candidateData?.twitter ?? '#'} target="_blank" rel="noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div> */}
                  </div>
                </Grid>

                <Grid item className="col-md-7">
                  {/* <CandidateTabs /> */}
                  <Box
                    sx={{
                      backgroundColor: "#F9F9FB",
                      marginTop: "12px",
                      padding: "20px",
                    }}
                  >
                    <About data={single_business?.description} />
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessProfile;

export async function getStaticProps({ params }) {
  console.log("🚀 ~ getStaticProps ~ params:", params);
  const res = await fetch(`${LIVE_BASE_URL}/api/businesses/${params?.slug}`)
    .then((response) => response.json())
    .then((json) => json);
  console.log("🚀 ~ getStaticProps ~ res:", res);

  return {
    props: {
      single_business: res?.data,
    },

    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${LIVE_BASE_URL}/api/businesses`)
    .then((response) => response.json())
    .then((json) => json);

  const paths = res?.data?.map((item) => ({
    params: {
      slug: item?.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
