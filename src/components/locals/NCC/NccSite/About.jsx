import PageBanner from "@/components/globals/PageBanner";
import { useSelector } from "react-redux";

const About = ({ siteSettingImages, about, title }) => {
  const { settings } = useSelector((state) => state.homepage);

  return (
    <>
      <PageBanner
        image={settings?.about_banner}
        title={settings?.about_title}
        subtitle={settings?.about_subtitle}
      />

      <section className="about" id="about_main">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-xl-5">
              <div className="img_container text-center">
                <img src={settings?.about_image} alt="" />
              </div>
            </div>
            <div className="col-lg-7 col-xl-7" id="about-section">
              <div className="about_title">{title}</div>
              <div className="about_description">
                <p>{settings?.about || "About Data Not Added"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
