import { getCandidates } from "@/redux/homepage/actions";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Candidate = ({ siteSettingImages, about, title }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { ncc } = router?.query;
  const { candidates, candidate_loading } = useSelector(
    (state) => state.homepage
  );
  useEffect(() => {
    const finalData = {
      country: ncc,
    };
    ncc && dispatch(getCandidates(finalData));
  }, [ncc]);

  return (
    <>
      {/* <PageBanner
        image={settings?.about_banner}
        title={settings?.title}
        subtitle={settings?.about_subtitle}
      /> */}

      {/* <section className="about" id="about_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-5">
              <div className="img_container text-center">
                <img src={settings?.about_image} alt="" />
              </div>
            </div>
            <div className="col-lg-7 col-xl-7" id="about-section">
              <div className="about_title">{title}</div>
              <div className="about_description">
                <p>{settings?.about || 'About Data Not Added'}</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <div className="main_content">
        <section className="all_events">
          {/* <div className="all_events_title">All Candidates</div> */}
          <div className="container">
            {candidate_loading ? (
              <Box
                display="flex"
                justifyContent="center"
                height="60vh"
                alignItems="center"
              >
                <CircularProgress size={24} />
              </Box>
            ) : (
              <div className="row">
                {candidates?.data?.length > 0 ? (
                  candidates?.data?.map((candidate) => (
                    <div key={candidate.id} className="col-md-3">
                      {/* <CandidateItem candidate={candidate} /> */}
                      <Link
                        href={`/ncc/${ncc}/candidate/${candidate?.member?.username}`}
                        className="political_item"
                      >
                        <div className="img_container">
                          <img src={candidate?.member?.profile_image} alt="" />
                        </div>
                        <div className="political_item_title text-center">
                          {candidate?.member?.first_name}{" "}
                          {candidate?.member?.last_name}
                        </div>
                        <div className="political_item_subtitle text-center">
                          {candidate?.designation}
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="col-md-12 mt-5 mb-5">
                    <h3 className="text-center">No candidates available</h3>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Candidate;
