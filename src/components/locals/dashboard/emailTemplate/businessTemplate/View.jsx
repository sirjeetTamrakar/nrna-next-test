import { changeDateFormat } from "@/utils/dateUtils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import Typography from "@mui/material/Typography";

const View = ({ data }) => {
  return (
    // <ul>
    //   {Object.entries(data)?.map((list, index) => (
    //     <li key={index}>{list[0] + ' : ' + list[1]}</li>
    //   ))}
    // </ul>

    <ol style={{ paddingTop: "8px", paddingBottom: "8px", listStyle: "none" }}>
      <div style={{ padding: "10px 0" }}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "700", color: "#474849" }}
        >
          {" "}
          {data?.title}
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
          <AccessTimeOutlinedIcon />
          {changeDateFormat(data?.created_at, "DD-MMM-YYYY HH:MM")}
        </span>
        {/* <span style={{ padding: '5px 0px' }}>
          <AccountCircleOutlinedIcon />
          {data?.created_by?.name && data?.created_by?.name}
        </span> */}
      </div>

      <div style={{ padding: "10px 0" }}>
        <div
          style={{ fontSize: "16px" }}
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
      </div>
    </ol>
  );
};

export default View;
