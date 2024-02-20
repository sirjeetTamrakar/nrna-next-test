import AboutSection from "@/components/globals/AboutSection";
import MissionSection from "@/components/globals/MissionSection";
import BannerBannerSection from "@/components/globals/SingleBanner";
import VisionSection from "@/components/globals/VisionSection";
import { getAllHomeData, getSiteSettings } from "@/redux/homepage/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import BusinessNav from "./BusinessNav";

const BusinessItemOneSingle = () => {
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
      type: "business",
      id: 1,
    };
    dispatch(getAllHomeData(finalData));
    dispatch(getSiteSettings());
  }, []);

  const [selected, setSelected] = useState("home");

  const navigate = useNavigate();
  const handleFunction = (data) => {
    navigate(data);
  };
  const homeOptions = (home_data?.data?.slice(0, 4) || []).map((item) => ({
    title: item?.tabtitle,
    value: item?.slug,
    clickFunction: () => handleFunction(`/nrna/business/${item.slug}`),
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
            linkUrl={`/nrna/business/${item?.slug}`}
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
            linkUrl={`/nrna/business/${item?.slug}`}
            description={item?.description}
            // viewAll
          />
        );
      }
    });
  };

  return (
    <>
      <BusinessNav
        category={allOptions}
        setSelected={setSelected}
        selected={selected}
        //   setSearch={setSearch}
      />
      <BannerBannerSection banners={settings} data={home_data} singleBanner />
      {settings?.business_description && (
        <AboutSection
          title={"About"}
          image={settings?.business_banner_image}
          viewAll
          // linkUrl={`/nrna/business/${item?.slug}`}
          about={settings?.business_description}
        />
      )}

      {renderSections()}
    </>
  );
};

export default BusinessItemOneSingle;
