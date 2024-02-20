import { changeDateFormat } from "@/utils/dateUtils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Typography from "@mui/material/Typography";

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
    // <ol style={{ paddingTop: '8px', paddingBottom: '8px', listStyle: 'none' }}>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Name:</span>
    //       <div style={{ fontSize: '16px' }}>{data?.name ? data?.name : '-'}</div>
    //     </div>
    //   </li>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Email:</span>
    //       <div style={{ fontSize: '16px' }}>{data?.email ? data?.email : '-'}</div>
    //     </div>
    //   </li>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Phone:</span>
    //       <div style={{ fontSize: '16px' }}>{data?.phone ? data?.phone : '-'}</div>
    //     </div>
    //   </li>

    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
    //         Created at:
    //       </span>
    //       <div style={{ fontSize: '16px' }}>{data?.created_at ? data?.created_at : '-'}</div>
    //     </div>
    //   </li>

    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Advice:</span>
    //       <div style={{ fontSize: '16px' }}>{data?.advice ? data?.advice : '-'}</div>
    //     </div>
    //   </li>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
    //         Country of residence:
    //       </span>
    //       <div style={{ fontSize: '16px' }}>
    //         {data?.country_of_residence ? data?.country_of_residence : '-'}
    //       </div>
    //     </div>
    //   </li>
    // </ol>
    <div style={{ padding: "10px 20px" }}>
      <div style={{ padding: "10px 0" }}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: "700", color: "#474849" }}
        >
          {" "}
          {data?.name}
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
          <EmailOutlinedIcon /> {data?.email && data?.email}
        </span>{" "}
        <span style={{ padding: "5px 0px" }}>
          <LocalPhoneOutlinedIcon /> {data?.phone && data?.phone}
        </span>{" "}
        <span style={{ padding: "5px 0px" }}>
          {" "}
          <LocationOnOutlinedIcon />{" "}
          {data?.country_of_residence && data?.country_of_residence}
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
