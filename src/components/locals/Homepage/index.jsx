import AboutSection from "@/components/globals/AboutSection";
import BannerSection from "@/components/globals/Banner";
import MissionSection from "@/components/globals/MissionSection";
import TaglineSection from "@/components/globals/TaglineSection";
import VisionSection from "@/components/globals/VisionSection";
import { getAllHomeData, getBanner } from "@/redux/homepage/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Homepage = () => {
  const dispatch = useDispatch();
  const { settings, banners, home_data } = useSelector(
    (state) => state.homepage
  );
  useEffect(() => {
    dispatch(getAllHomeData());
    dispatch(getBanner());
  }, []);

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
            linkUrl={`/foreign-employment/${item?.slug}`}
            description={item?.description}
          />
        );
      } else {
        // Odd index, render MissionSection
        return (
          <MissionSection
            key={item?.id}
            title={item?.title}
            image={item?.image}
            linkUrl={`/foreign-employment/${item?.slug}`}
            description={item?.description}
          />
        );
      }
    });
  };

  return (
    <>
      <BannerSection banners={banners} />
      {settings?.tagline_description && (
        <TaglineSection
          tagline={settings?.tagline_description}
          taglineAuthor={settings?.tagline_author}
        />
      )}
      {settings?.about && (
        <AboutSection
          about={settings?.about}
          image={settings?.about_image}
          title="बारेमा (About)"
        />
      )}
      {renderSections()}
    </>
  );
};

export default Homepage;
