import BannerImage from "@/assets/images/banner.jpg";

const PageBanner = ({
  image = BannerImage,
  title = "Welcome to NBNS Global",
  subtitle = "",
}) => {
  return (
    <div className="page_banner">
      <img src={image && image} alt="" style={{ objectFit: "cover" }} />
      <div className="content_wrapper">
        <div className="container">
          <div className="title">{title && title}</div>
          <div className="subtitle">{subtitle && subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
