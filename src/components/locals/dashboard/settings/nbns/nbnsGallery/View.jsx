import { changeDateFormat } from "@/utils/dateUtils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const View = ({ data }) => {
  return (
    <div style={{ padding: "10px 20px" }}>
      <div style={{ padding: "10px 0" }}>
        <div style={{ width: "100%", height: "200px" }}>
          <img
            src={data?.gallery_image}
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
      </div>
    </div>
  );
};

export default View;
