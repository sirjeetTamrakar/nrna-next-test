import PageBanner from "@/components/globals/PageBanner";
import TaglineSection from "@/components/globals/TaglineSection";
import { getSingleHomeData } from "@/redux/homepage/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const HomeDataCom = () => {
  const dispatch = useDispatch();
  const { settings, single_home_data } = useSelector((state) => state.homepage);
  const { slug } = useParams();
  useEffect(() => {
    dispatch(getSingleHomeData(slug));
  }, [slug]);

  return (
    <>
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
              <div className="about_title">{single_home_data?.tabtitle}</div>
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

export default HomeDataCom;
