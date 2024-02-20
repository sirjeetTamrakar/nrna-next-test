import EastIcon from "@mui/icons-material/East";
import Link from "next/link";

const BusinessItemOne = ({
  settingsData,
  businessItem,
  linkUrl,
  gridLayout,
  gridOne,
}) => {
  return (
    <div className={""}>
      <div className="news_card">
        <div className={"img_wrapper_grid_one"}>
          <img src={settingsData?.business_banner_image} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <div className="news_card_featured_news_box_grid_one">Featured News</div> */}
          <div className="news_card_title_grid_one_business">
            {settingsData?.business_title}
          </div>
          {settingsData?.business_description !== "" && (
            <div
              className="news_card_text_description_ncc"
              dangerouslySetInnerHTML={{
                __html: settingsData?.business_description || "",
              }}
            />
          )}

          <Link href={linkUrl} className="learnMoreBox">
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ color: "#4D99D5" }}>Learn more</p>
              <div style={{ width: "5px" }}>
                <EastIcon
                  className="learnMoreBox_btn"
                  style={{
                    fontSize: "large",
                    color: "#fff",
                    backgroundColor: "#c9e2f0",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BusinessItemOne;
