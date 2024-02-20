import { getCandidates } from "@/redux/homepage/actions";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CandidateItem from "./CandidateItem";

const Candidates = () => {
  const dispatch = useDispatch();
  const { candidates, candidate_loading } = useSelector(
    (state) => state.homepage
  );
  useEffect(() => {
    dispatch(getCandidates());
  }, []);
  return (
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
              {candidates?.length > 0 ? (
                candidates?.map((candidate) => (
                  <div key={candidate.id} className="col-md-3">
                    <CandidateItem candidate={candidate} />
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
  );
};

export default Candidates;
