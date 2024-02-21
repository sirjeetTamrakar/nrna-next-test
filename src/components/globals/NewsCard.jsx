import { TimeAgo } from "@/components/common/CustomTime/CustomTime";
import Link from "next/link";

const NewsCard = ({
  news,
  linkUrl,
  gridLayout,
  gridOne,
  belowNews,
  image,
  author,
  excerpt,
  title,
}) => {
  return (
    <div className={gridLayout ? "" : "col-md-4 col-lg-3 col-sm-6 col-12"}>
      <Link
        href={linkUrl}
        className="news_card"
        style={belowNews && { marginTop: "20px", marginBottom: "20px" }}
      >
        <div className={gridOne ? "img_wrapper_grid_one" : "img_wrapper"}>
          <img src={news?.feature_image} alt="" />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <div className="news_card_title">{news?.title}</div>
          {news?.excerpt !== "" && (
            <div className="news_card_text_desc">{news?.excerpt}</div>
          )}
          <div className="news_card_text_date">
            <TimeAgo time={news?.created_at} /> |&nbsp;
            {news?.author}{" "}
          </div>{" "}
        </div>
      </Link>
    </div>
  );
};

export default NewsCard;
