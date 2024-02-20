import profilePic from "@/assets/images/profileImage2.jpg";
import {
  getDepartment,
  getSingleNCC,
  getTeams,
} from "@/redux/homepage/actions";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondaryNav from "./SecondaryNav";

const CommitteeMembers = () => {
  const dispatch = useDispatch();

  const location = {};

  const { teams, department, single_ncc } = useSelector(
    (state) => state.homepage
  );
  const [filteredTeams, setFilteredTeams] = useState();
  const router = useRouter();
  const { ncc } = router?.query;
  const [selected, setSelected] = useState();
  useEffect(() => {
    setSelected(location?.state ? location?.state : department?.[0]?.id);
  }, [location?.state, department]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    ncc &&
      single_ncc?.id &&
      dispatch(getTeams({ ncc_id: single_ncc?.id, country: ncc }));
  }, [ncc, single_ncc?.id]);
  useEffect(() => {
    dispatch(getDepartment());
  }, []);

  useEffect(() => {
    if (teams?.data) {
      const newTeams = teams?.data?.filter(
        (list) =>
          list?.member?.full_name
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) &&
          Number(list?.our_team_category_id) == Number(selected)
      );
      setFilteredTeams(newTeams);
    }
  }, [search, teams?.data, selected, department]);

  useEffect(() => {
    ncc && dispatch(getSingleNCC(ncc));
  }, [ncc]);

  return (
    <>
      <SecondaryNav
        category={department}
        setSelected={setSelected}
        selected={selected}
        setSearch={setSearch}
        id={ncc}
        teams
        color={"#fff"}
        data={teams?.data}
      />
      <div className="main_content">
        <section className="all_events">
          <div className="all_events_title">All Committee Members</div>
          <div></div>
          <div className="container">
            <div className="row">
              {filteredTeams && filteredTeams?.length > 0 ? (
                filteredTeams?.map((committee, index) => (
                  <div className="col-md-3" key={index}>
                    <Link
                      href={`/ncc/${ncc}/committee/${committee?.member?.username}`}
                      className="candidateCard"
                    >
                      <div className="img_container">
                        <img
                          src={committee?.member?.profile_image ?? profilePic}
                          alt=""
                        />
                      </div>
                      <div className="candidateCard_content_wrap">
                        <div className="candidateCard_title text-center">
                          {committee?.member?.full_name}
                        </div>
                        <div className="candidateCard_subtitle text-center">
                          {committee?.designation}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-md-12 mt-5 mb-5">
                  <h3 className="text-center">No Members available</h3>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CommitteeMembers;
