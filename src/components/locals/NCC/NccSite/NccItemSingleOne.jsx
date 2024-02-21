import MissionSection from "@/components/globals/MissionSection";
import BannerBannerSection from "@/components/globals/SingleBanner";
import VisionSection from "@/components/globals/VisionSection";
import { getAllHomeData, getSiteSettings } from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NccNav from "./NccNav";

const NccItemOneSingle = () => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { settings, banners, home_data } = useSelector(
    (state) => state.homepage
  );
  useEffect(() => {
    const finalData = {
      type: "nccCard",
      id: 1,
    };
    dispatch(getAllHomeData(finalData));
  }, []);
  useEffect(() => {
    dispatch(getSiteSettings());
  }, []);

  const navigate = useRouter();
  const [selected, setSelected] = useState(navigate?.query?.slug || "home");

  const handleFunction = (data) => {
    navigate.push(data);
  };
  const homeOptions = (home_data?.data?.slice(0, 4) || []).map((item) => ({
    title: item?.tabtitle,
    value: item?.slug,
    clickFunction: () => handleFunction(`/nrna/ncc/${item.slug}`),
  }));
  //   const options = [
  //     { title: 'Home', value: 'home', clickFunction: () => handleFunction('/nrna/business') }
  //   ];

  const allOptions = [...homeOptions];

  // Map home_data into MissionSection and VisionSection in an alternating way
  const renderSections = () => {
    return home_data?.data?.map((item, index) => {
      if (index % 2 !== 0) {
        // Even index, render VisionSection
        return (
          <VisionSection
            key={item?.id}
            title={item?.title}
            image={item?.image}
            linkUrl={`/nrna/ncc/${item?.slug}`}
            description={item?.description}
            // viewAll
          />
        );
      } else {
        // Odd index, render MissionSection
        return (
          <MissionSection
            key={item?.id}
            title={item?.title}
            image={item?.image}
            linkUrl={`/nrna/ncc/${item?.slug}`}
            description={item?.description}
            // viewAll
          />
        );
      }
    });
  };

  return (
    <>
      <NccNav
        category={allOptions}
        setSelected={setSelected}
        selected={selected}
        //   setSearch={setSearch}
      />
      <BannerBannerSection
        banners={settings}
        data={home_data}
        singleBanner
        ncc
      />

      {renderSections()}
    </>
  );
};

export default NccItemOneSingle;
