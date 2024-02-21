import PageBanner from "@/components/globals/PageBanner";
import TaglineSection from "@/components/globals/TaglineSection";
import { getAllHomeData, getSingleHomeData } from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NccNav from "./NccNav";

const NccDataComponent = () => {
  const pathname = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const dispatch = useDispatch();
  const { slug } = useRouter().query;

  const { home_data, single_home_data } = useSelector(
    (state) => state.homepage
  );
  useEffect(() => {
    const finalData = {
      type: "nccCard",
      id: 1,
    };
    dispatch(getAllHomeData(finalData));
  }, []);

  const [selected, setSelected] = useState(slug || "home");

  const navigate = useRouter();
  const handleFunction = (data) => {
    navigate.push(data);
  };
  const homeOptions = (home_data?.data?.slice(0, 4) || []).map((item) => ({
    title: item?.tabtitle,
    value: item?.slug,
    clickFunction: () => handleFunction(`/nrna/ncc/${item.slug}`),
  }));
  // const options = [
  //   { title: 'Home', value: 'home', clickFunction: () => handleFunction('/nrna/business') }
  // ];

  useEffect(() => {
    slug && dispatch(getSingleHomeData(slug));
  }, [slug]);

  const allOptions = [...homeOptions];
  return (
    <>
      <NccNav
        category={allOptions}
        setSelected={setSelected}
        selected={selected}
        //   setSearch={setSearch}
      />
      <PageBanner
        image={single_home_data?.banner_image}
        title={single_home_data?.title}
        subtitle={single_home_data?.subtitle}
      />
      {single_home_data?.tagline && (
        <TaglineSection
          tagline={single_home_data?.tagline}
          taglineAuthor={single_home_data?.tagline_author}
        />
      )}

      <section className="about" id="about_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-5">
              <div className="img_container text-center">
                <img src={single_home_data?.image} alt="" />
              </div>
            </div>
            <div className="col-lg-7 col-xl-7" id="about-section">
              <div className="about_title">{single_home_data?.title}</div>
              <div className="about_description_single">
                <div
                  dangerouslySetInnerHTML={{
                    __html: single_home_data?.description,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NccDataComponent;
