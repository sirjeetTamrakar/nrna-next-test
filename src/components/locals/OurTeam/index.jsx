import { getDepartment, getTeams } from "@/redux/homepage/actions";
import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OurTeamCard from "./OurTeamCard";
import SecondaryNav from "./secondaryNav";

const OurTeam = () => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { teams, team_loading, department, department_loading } = useSelector(
    (state) => state.homepage
  );
  const [filteredTeam, setFilteredTeam] = useState();

  const [selected, setSelected] = useState();
  const [search, setSearch] = useState("");
  const [teamLimit, setTeamLimit] = useState(12);

  useEffect(() => {
    selected ?? setSelected(department?.[0]?.id);
  }, [department]);

  useEffect(() => {
    const finalData = {
      limit: teamLimit,
      category_id: selected,
    };
    dispatch(getTeams(finalData));
    dispatch(getDepartment());
  }, [teamLimit, selected]);

  useEffect(() => {
    if (teams?.data) {
      const newTeam = teams?.data?.filter(
        (list) =>
          list?.member?.username
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) &&
          list?.our_team_category_id == Number(selected)
      );
      setFilteredTeam(newTeam);
    }
  }, [search, teams?.data, selected, department]);

  const handleShowMore = () => {
    setTeamLimit((prev) => prev + 8);
  };

  return (
    <>
      <SecondaryNav
        departments={department}
        selected={selected}
        setSelected={setSelected}
        setSearch={setSearch}
      />
      <section className="all_events">
        <div className="container">
          <div className="row">
            {filteredTeam?.length > 0 ? (
              <>
                <>
                  {filteredTeam?.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="col-xl-3 col-lg-4 col-sm-6 col-12"
                    >
                      <OurTeamCard candidate={candidate} />
                    </div>
                  ))}
                </>
                <>
                  {teams?.meta?.to !== teams?.meta?.total && !team_loading && (
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
              </>
            ) : (
              ""
            )}
          </div>
          {team_loading || department_loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={24} />
            </Box>
          ) : (
            filteredTeam?.length === 0 && (
              <div className="col-md-12 mt-5 mb-5">
                <h3 className="text-center">No team available</h3>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default OurTeam;
