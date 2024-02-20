import facebook from "@/assets/images/facebook.png";
import insta from "@/assets/images/insta.png";
import linkedin from "@/assets/images/linkedin.png";
import {
  getBusiness,
  getBusinessCategory,
  getSingleBusiness,
  getSingleNCC,
} from "@/redux/homepage/actions";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getBusinessCategory, getSingleBusiness } from '@/redux/homepage/actions';

const SingleBusiness = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug, ncc } = router?.query;
  const [filteredSingleBusiness, setFilteredSingleBusiness] = useState();
  const { business, single_business, business_category, single_ncc } =
    useSelector((state) => state.homepage);
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

  useEffect(() => {
    slug && dispatch(getSingleBusiness(slug));
  }, [slug]);
  useEffect(() => {
    dispatch(getBusinessCategory());
    dispatch(getBusiness());
  }, []);

  useEffect(() => {
    ncc && dispatch(getSingleNCC(ncc));
  }, [ncc]);

  return (
    <>
      {/* <SecondaryNav
        id={ncc}
        category={business_category}
        setSelected={setSelected}
        selected={selected}
        business
        color={single_ncc?.color}
      /> */}
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
        <div className="container">
          <div className="candidate_page">
            <div className="candidate_page_lower_banner">
              <div className="candidate_page_lower_banner_wrapper">
                <div className="candidate_page_lower_banner_wrapper_box">
                  <div className="img_container">
                    <img src={single_business?.image} alt="" />
                  </div>
                  <div className="candidate_name_box">
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
                <div className="candidate_social_wrapper_box">
                  <div className="candidate_social_wrapper">
                    <div className="candidate_social_icons_box">
                      <a
                        href={single_business?.facebook_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src={facebook}
                          alt=""
                          className="candidate_social_icons"
                        />
                      </a>
                    </div>
                    <a
                      href={single_business?.instagram_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="candidate_social_icons_box">
                        <Image
                          src={insta}
                          alt=""
                          className="candidate_social_icons"
                        />
                      </div>
                    </a>
                    <a
                      href={single_business?.twitter_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div className="candidate_social_icons_box">
                        <Image
                          src={linkedin}
                          alt=""
                          className="candidate_social_icons"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <hr />
            </div>
            <div className="candidate_page_wrapper">
              <Grid container spacimg={2}>
                <Grid item sm={5}>
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

                          {/* <iframe
                          width="100%"
                          height="220"
                          frameBorder="0"
                          allowFullScreen
                          src={single_business?.google_map_link}></iframe> */}
                        </div>
                        {/* <span className="contact_list_item">{candidateData?.address ?? ''}</span> */}
                      </li>
                    </ul>
                  </div>
                </Grid>

                <Grid item sm={7}>
                  {/* <CandidateTabs /> */}
                  <Box
                    sx={{
                      backgroundColor: "#F9F9FB",
                      marginTop: "12px",
                      padding: "20px",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "500",
                          marginBottom: "17px",
                        }}
                      >
                        About Us
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "400",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: single_business?.description,
                          }}
                        />
                      </p>
                    </div>
                  </Box>
                </Grid>
              </Grid>
              {/* <div className="candidate_page_content">
              {candidateData?.dynamic_description &&
                candidateData?.dynamic_description?.map((data, index) => (
                  <div key={index}>
                    <div className="candidate_page_content_title">{data?.title}</div>
                    <div
                      className="candidate_page_content_description"
                      dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                  </div>
                ))}
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBusiness;
