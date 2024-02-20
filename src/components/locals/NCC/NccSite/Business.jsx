import {
  getBusiness,
  getBusinessCategory,
  getSingleNCC,
  resetBusinessState,
} from "@/redux/homepage/actions";
import { Box, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SecondaryNav from "./SecondaryNav";

const BusinessNcc = () => {
  const dispatch = useDispatch();

  const location = {};

  const {
    business,
    business_loading,
    business_category,
    business_category_loading,
    single_ncc,
  } = useSelector((state) => state.homepage);
  const router = useRouter();
  const { ncc } = router?.query;
  const [filteredBusiness, setFilteredBusiness] = useState();
  const [selected, setSelected] = useState();

  useEffect(() => {
    setSelected(
      location?.state ? location?.state : selected ? selected : "ALL"
    );
  }, [location?.state, business_category]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const finalData = {
      country: ncc,
    };
    ncc && dispatch(getBusiness(finalData));
  }, [ncc]);
  useEffect(() => {
    dispatch(getBusinessCategory());
  }, []);

  useEffect(() => {
    ncc && dispatch(getSingleNCC(ncc));
  }, [ncc]);

  useEffect(() => {
    dispatch(resetBusinessState());
  }, []);

  useEffect(() => {
    if (business) {
      const newBusiness = business?.data?.filter(
        (list) =>
          list?.fullname?.toLowerCase()?.includes(search?.toLowerCase()) &&
          Number(list?.business_category_id) == Number(selected)
      );
      setFilteredBusiness(selected === "ALL" ? business?.data : newBusiness);
    }
  }, [search, business?.data, selected, business_category]);

  return (
    <>
      <SecondaryNav
        category={business_category}
        setSelected={setSelected}
        selected={selected}
        setSearch={setSearch}
        id={ncc}
        color={"#fff"}
        business
        data={business?.data}
      />
      <div className="main_content">
        <section className="all_events">
          {/* <div className="all_events_title">Business</div> */}
          <div className="container">
            <div className="row">
              {filteredBusiness?.length > 0
                ? filteredBusiness?.map((businessItem) => (
                    // <NewsCard
                    //   key={newsItem.id}
                    //   news={newsItem}
                    //   linkUrl={`/ncc/${ncc}/news/${newsItem?.slug}`}
                    // />
                    <div
                      key={businessItem?.id}
                      className={"col-md-4 col-lg-3 col-sm-6 col-12"}
                    >
                      <Link
                        href={`/ncc/${ncc}/business/${businessItem.slug}`}
                        className="political_item"
                      >
                        <div className="img_container">
                          <img src={businessItem?.image} alt="" />
                        </div>
                        <div
                          style={{ paddingBottom: "10px" }}
                          className="political_item_title text-center"
                        >
                          {businessItem.fullname}
                        </div>
                      </Link>
                    </div>
                  ))
                : ""}
            </div>
            {business_loading || business_category_loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress size={24} />
              </Box>
            ) : (
              filteredBusiness?.length === 0 && (
                <div className="col-md-12 mt-5 mb-5">
                  <h3 className="text-center">No business available</h3>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default BusinessNcc;
