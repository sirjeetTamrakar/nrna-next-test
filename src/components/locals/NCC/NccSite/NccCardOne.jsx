import EastIcon from "@mui/icons-material/East";
import Link from "next/link";

const NccItemOne = ({
  settingsData,
  nccItem,
  linkUrl,
  gridLayout,
  gridOne,
}) => {
  return (
    <div className={""}>
      <div className="news_card">
        <div className={"img_wrapper_grid_one"}>
          <img src={settingsData?.ncc_banner_image} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* <div className="news_card_featured_news_box_grid_one">Featured News</div> */}
          <div className="news_card_title_grid_one_business">
            {settingsData?.ncc_title}
          </div>
          {settingsData?.ncc_description !== "" && (
            <div
              className="news_card_text_description_ncc"
              dangerouslySetInnerHTML={{
                __html: settingsData?.ncc_description || "",
              }}
            />
          )}
          {/* {news?.description !== '' && (
            <div className="news_card_text_description">{news?.description}</div>
          )} */}
          {/* <div className="news_card_text_date_grid_one">
            <TimeAgo time={news?.created_at} /> |&nbsp;
            {news?.created_by?.full_name
              ? news?.created_by?.full_name
              : news?.created_by?.username}{' '}
          </div>{' '} */}
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

export default NccItemOne;
