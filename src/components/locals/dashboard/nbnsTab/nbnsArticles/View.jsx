import { changeDateFormat } from "@/utils/dateUtils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Typography } from "@mui/material";

const View = ({ data }) => {
  return (
    <div style={{ padding: "10px 20px" }}>
      <div style={{ padding: "10px 0" }}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "700", color: "#474849" }}
        >
          {" "}
          {data?.title}
        </Typography>
      </div>
      <div style={{ padding: "10px 0" }}>
        <div style={{ width: "100%", height: "200px" }}>
          <img
            src={data?.article_image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>
      <div
        style={{
          paddingBottom: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ padding: "5px 0px" }}>
          <AccessTimeOutlinedIcon />
          {changeDateFormat(data?.created_at, "DD-MMM-YYYY HH:MM")}
        </span>
        <span style={{ padding: "5px 0px" }}>
          <AccountCircleOutlinedIcon />
          {data?.author && data?.author}
        </span>
      </div>
      <div style={{ padding: "10px 0" }}>
        <div
          style={{ fontSize: "16px" }}
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
      </div>
    </div>
  );
};

export default View;
