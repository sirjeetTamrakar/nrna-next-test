import Link from "next/link";

const VisionSection = ({ image, linkUrl, title, description, viewAll }) => {
  return (
    <section className="vision" id="vision_main">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-xl-5">
            <div className="img_container text-center">
              <img src={image} alt="" />
            </div>
          </div>
          <div className="col-lg-7 col-xl-7" id="vision-section">
            <div className="vision_title">{title}</div>
            <div
              className="vision_description"
              dangerouslySetInnerHTML={{ __html: description || "" }}
            />
            {!viewAll && (
              <Link href={linkUrl || `/vision`} className="view_more">
                View More
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
