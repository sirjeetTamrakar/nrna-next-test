import { TimeAgo } from "@/components/common/CustomTime/CustomTime";
import Link from "next/link";

const NewsCardOrderOne = ({
  news,
  linkUrl,
  gridLayout,
  gridOne,
  featuredTitle,
  image,
  title,
  excerpt,
  author,
}) => {
  return (
    <div className={gridLayout ? "" : "col-md-4 col-lg-3 col-sm-6 col-12"}>
      <Link href={linkUrl} className="news_card">
        <div className={"img_wrapper_grid_one"}>
          <img src={image} alt="" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="news_card_featured_news_box_grid_one">{`Featured ${featuredTitle}`}</div>
          <div className="news_card_title_grid_one">{title}</div>
          {news?.excerpt !== "" && (
            <div className="news_card_text_desc_grid_one">{excerpt}</div>
          )}
          {/* {news?.description !== '' && (
            <div className="news_card_text_description">{news?.description}</div>
          )} */}
          <div className="news_card_text_date_grid_one">
            <TimeAgo time={news?.created_at} /> |&nbsp;{author}{" "}
          </div>{" "}
        </div>
      </Link>
    </div>
  );
};

export default NewsCardOrderOne;
