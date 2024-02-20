import { changeDateFormat } from "@/utils/dateUtils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import Typography from "@mui/material/Typography";

const View = ({ data }) => {
  return (
    <div style={{ padding: "10px 20px" }}>
      <div style={{ padding: "10px 0" }}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "700", color: "#474849" }}
        >
          {" "}
          {data?.member?.name}
        </Typography>
      </div>

      <div
        style={{
          paddingBottom: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span style={{ padding: "5px 0px" }}>
          <AccessTimeOutlinedIcon />{" "}
          {changeDateFormat(data?.created_at, "DD-MMM-YYYY HH:MM")}
        </span>{" "}
        <span style={{ padding: "5px 0px" }}>
          <EngineeringOutlinedIcon /> {data?.designation && data?.designation}
        </span>{" "}
        <span style={{ padding: "5px 0px" }}>
          <ScaleOutlinedIcon /> {data?.order && data?.order}
        </span>{" "}
      </div>
      <div style={{ padding: "10px 0" }}>
        <div
          style={{ fontSize: "16px" }}
          dangerouslySetInnerHTML={{ __html: data?.advice }}
        />
      </div>
    </div>
  );
};

export default View;
