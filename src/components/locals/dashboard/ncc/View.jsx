import { changeDateFormat } from "@/utils/dateUtils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
const View = ({ data }) => {
  // if (selectedFile) {
  //   const img = new Image();
  //   img.src = URL.createObjectURL(selectedFile);
  //   img.onload = () => {
  //     const width = img.width;
  //     const height = img.height;
  //     setResolution(`${width} x ${height}`);
  //   };

  return (
    <div style={{ padding: "10px 20px" }}>
      {/* <div style={{ padding: '10px 0' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '700', color: '#474849' }}>
          {' '}
          {data?.country_name}
        </Typography>
      </div> */}

      <div
        style={{
          paddingBottom: "10px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "10px 0" }}>
          <div style={{ width: "100%", height: "200px" }}>
            <img
              src={data?.logo}
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
        <span style={{ padding: "5px 0px" }}>
          <AccessTimeOutlinedIcon />{" "}
          {changeDateFormat(data?.created_at, "DD-MMM-YYYY HH:MM")}
        </span>{" "}
        <span style={{ padding: "5px 0px" }}>
          {" "}
          <LocationOnOutlinedIcon /> {data?.country_name && data?.country_name}
        </span>
        <span style={{ padding: "5px 0px" }}>
          {" "}
          <ColorLensOutlinedIcon />{" "}
          <span
            style={{
              padding: "2px 20px",
              borderRadius: "10px",
              backgroundColor: data?.color,
              marginLeft: "2px",
            }}
          ></span>
          <span style={{ marginLeft: "5px" }}>
            ({`${data?.country_name}'s navbar color`})
          </span>
        </span>
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
