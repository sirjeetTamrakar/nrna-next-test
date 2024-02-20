import Banner from "@/assets/images/banner.png";
import bannerPic from "@/assets/images/bannerImage.jpg";
import CandidateImage1 from "@/assets/images/candidate1.png";
import facebook from "@/assets/images/facebook.png";
import insta from "@/assets/images/insta.png";
import linkedin from "@/assets/images/linkedin.png";
import profilePic from "@/assets/images/profileImage2.jpg";
import {
  getDepartment,
  getSingleUser,
  getTeams,
} from "@/redux/homepage/actions";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const candidateImages = {
    profileBannerImage: Banner,
    profileImage: CandidateImage1,
  };
  const currentUser = {
    name: "Yogen Bahadur Chhetri",
    designation: "Chairman",
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { username } = useRouter()?.query;

  const { single_user } = useSelector((state) => state.homepage);

  useEffect(() => {
    username && dispatch(getSingleUser(username));
  }, [username]);
  useEffect(() => {
    if (user?.ncc?.id) {
      dispatch(getTeams({ ncc_id: user?.ncc?.id }));
      dispatch(getDepartment({ ncc_id: user?.ncc?.id }));
    }
  }, [user?.ncc?.id]);

  return (
    <>
      {/* <SecondaryNav
        id={ncc}
        category={department}
        setSelected={setSelected}
        selected={selected}
        teams
      /> */}
      <div className="main_content">
        <div style={{}}>
          <div
            className="candidate_page_banner"
            style={{
              backgroundImage: `url('${
                single_user?.profile_banner
                  ? single_user?.profile_banner
                  : bannerPic
              }')`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
          <div className="container">
            <div className="candidate_page_lower_banner">
              <div className="candidate_page_lower_banner_wrapper">
                <div className="candidate_page_lower_banner_wrapper_box">
                  <div className="img_container_profile">
                    <img
                      src={
                        single_user?.profile_image
                          ? single_user?.profile_image
                          : profilePic
                      }
                      alt=""
                    />
                  </div>
                  <div className="candidate_name_box">
                    <div className="candidate_name">
                      {single_user?.full_name !== ""
                        ? single_user?.full_name
                        : single_user?.username}
                    </div>
                    <div className="candidate_designation">
                      {single_user?.role_name ?? ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className="candidate_social">
                <div className="candidate_social_wrapper_box">
                  <div className="candidate_social_wrapper">
                    <a
                      href={single_user?.facebook_url}
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
                    <a
                      href={single_user?.instagram_url}
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
                      href={single_user?.linkedin_url}
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
          </div>
        </div>
        <div className="container">
          <div className="candidate_page">
            <div>
              <hr />
            </div>
            <div className="candidate_page_wrapper">
              <Grid container spacimg={2}>
                <Grid item sm={4}>
                  <div className="candidate_page_sidebar">
                    <ul className="contact_list" style={{ width: "330px" }}>
                      <li className="contact_list_title_box">
                        {" "}
                        <PermContactCalendarIcon />
                        <span className="contact_list_title">
                          Contact Details
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">Username</div>
                        <span className="contact_list_item">
                          {single_user?.username ?? ""}
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">
                          Email Address
                        </div>
                        <span className="contact_list_item">
                          {single_user?.email ?? ""}
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">Phone no.</div>
                        <span className="contact_list_item">
                          {single_user?.phone ?? ""}
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">Address</div>
                        <span className="contact_list_item">
                          {single_user?.address ?? ""}
                        </span>
                      </li>
                      <li>
                        <div className="contact_list_subtitle">
                          Country Of Residence
                        </div>
                        <span className="contact_list_item">
                          {single_user?.country_of_residence ?? ""}
                        </span>
                      </li>
                    </ul>
                  </div>
                </Grid>
                <Grid item sm={8}>
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
                            __html: single_user?.description,
                          }}
                        />
                      </p>
                    </div>
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

export default Profile;
