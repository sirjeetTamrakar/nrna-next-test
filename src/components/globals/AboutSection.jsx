import Link from "next/link";

const AboutSection = ({ image, linkUrl, title = "About", about, viewAll }) => {
  return (
    <section className="about" id="about_main">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-xl-5">
            <div className="img_container text-center">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="col-lg-7 col-xl-7" id="about-section">
            <div className="about_title">{title}</div>
            <div
              className="about_description"
              dangerouslySetInnerHTML={{ __html: about || "" }}
            />

            {!viewAll && (
              <Link
                href={linkUrl || `/foreign-employment/about`}
                className="view_more"
              >
                View More
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
