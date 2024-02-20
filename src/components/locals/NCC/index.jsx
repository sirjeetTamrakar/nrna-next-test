import { getAllRegions, getNcc } from "@/redux/homepage/actions";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NCCItem from "./NCCItem";
import NccItemOne from "./NccSite/NccCardOne";
import SecondaryNav from "./SecondaryNav";

const AllNCCSection = () => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const { ncc: slug } = useParams();
  const { ncc, ncc_loading, settings, regions } = useSelector(
    (state) => state.homepage
  );
  const [filteredNcc, setFilteredNcc] = useState([]);
  const [nccLimit, setNccLimit] = useState(9);
  const [selected, setSelected] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllRegions());
  }, []);

  const regionOptions = regions?.map((item) => ({
    title: item?.name,
    slug: item?.name,
  }));

  useEffect(() => {
    if (selected === "ALL") {
      const finalData = {
        limit: nccLimit,
      };
      dispatch(getNcc(finalData));
    } else {
      setFilteredNcc("");
      const finalData = {
        // continent: selected,
        region: selected,
      };
      dispatch(getNcc(finalData));
    }
  }, [nccLimit, selected]);

  const allOptions = [...regionOptions];

  useEffect(() => {
    setSelected("ALL");
  }, [location?.state]);

  useEffect(() => {
    if (ncc?.data) {
      if (selected === "ALL" && search) {
        const data = ncc?.data?.filter((list) =>
          list?.country_name?.toLowerCase()?.includes(search?.toLowerCase())
        );
        setFilteredNcc(data);
      } else if (selected === "ALL" && !search) {
        setFilteredNcc(ncc?.data);
      } else {
        const data = ncc?.data?.filter(
          (list) =>
            list?.country_name
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) &&
            list?.ncc_regions?.filter((item) => item === selected)
        );
        setFilteredNcc(data);
      }
    }
  }, [ncc?.data, search]);

  const handleShowMore = () => {
    setNccLimit((prev) => prev + 8);
  };

  return (
    <>
      <SecondaryNav
        category={allOptions}
        setSelected={setSelected}
        selected={selected}
        setSearch={setSearch}
      />
      <section className="all_events">
        <div className="container">
          <div className="row">
            {filteredNcc?.length > 0 ? (
              <>
                {selected === "ALL" ? (
                  <>
                    <Grid container spacing={0} sx={{ marginBottom: "20px" }}>
                      <Grid item className="col-md-12 col-lg-5 ncc_grid_one">
                        {/* {filteredBusiness?.slice(0, 1)?.map((item) => ( */}
                        <div>
                          <NccItemOne
                            settingsData={settings}
                            mainGrid
                            linkUrl={`/nrna/ncc`}
                          />
                        </div>
                        {/* ))} */}
                      </Grid>
                      <Grid item className=" col-md-12 col-lg-7">
                        <Grid container spacing={2} item>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(0, 1)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(1, 2)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(2, 3)?.map((item) => (
                              // <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 col-12">
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(3, 4)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(4, 5)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(5, 6)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(6, 7)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(7, 8)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                          <Grid
                            item
                            className="col-6 col-sm-6 col-md-4 col-lg-4"
                          >
                            {filteredNcc?.slice(8, 9)?.map((item) => (
                              <div
                                key={item.id}
                                className=""
                                style={{ marginTop: "-30px" }}
                              >
                                <NCCItem nccItem={item} />
                              </div>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {filteredNcc?.slice(9)?.map((item) => (
                      <div
                        key={item.id}
                        className="col-6 col-md-4 col-lg-3 col-sm-6"
                        style={{ marginTop: "-30px" }}
                      >
                        <NCCItem nccItem={item} />
                      </div>
                    ))}
                  </>
                ) : (
                  filteredNcc?.map((item) => (
                    <div
                      key={item.id}
                      className="col-6 col-md-4 col-lg-3 col-xl-2"
                      style={{ marginTop: "-30px" }}
                    >
                      {/* <BusinessItem businessItem={item} /> */}
                      <NCCItem nccItem={item} />
                    </div>
                  ))
                )}
                <>
                  {ncc?.meta?.to !== ncc?.meta?.total && !ncc_loading && (
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
            {/* {ncc_loading ? (
            <Box display="flex" justifyContent="center" height="60vh" alignItems="center">
              <CircularProgress size={24} />
            </Box>
          ) : (
            <div className="row">
              {filteredNcc?.length > 0 ? (
                filteredNcc?.map((nccItem) => (
                  <div key={nccItem.id} className="col-6 col-md-4 col-lg-3 col-xl-2">
                    <NCCItem nccItem={nccItem} />
                  </div>
                ))
              ) : (
                <div className="col-md-12 mt-5 mb-5">
                  <h3 className="text-center">No NCC items available</h3>
                </div>
              )}
            </div>
          )} */}
          </div>
          {ncc_loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress size={24} />
            </Box>
          ) : (
            filteredNcc?.length === 0 && (
              <div className="col-md-12 mt-5 mb-5">
                <h3 className="text-center">No ncc available</h3>
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default AllNCCSection;
