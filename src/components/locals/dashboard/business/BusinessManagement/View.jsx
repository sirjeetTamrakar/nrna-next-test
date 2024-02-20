import { changeDateFormat } from "@/utils/dateUtils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Typography } from "@mui/material";

const View = ({ data }) => {
  return (
    // <ol style={{ paddingTop: '8px', paddingBottom: '8px', listStyle: 'none' }}>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Title:</span>
    //       <div style={{ fontSize: '16px' }}>{data?.title ? data?.title : '-'}</div>
    //     </div>
    //   </li>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>Status:</span>
    //       <div style={{ fontSize: '16px' }}>{data?.status ? data?.status : '-'}</div>
    //     </div>
    //   </li>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
    //         Created by:
    //       </span>
    //       <div style={{ fontSize: '16px' }}>
    //         {data?.created_by?.name ? data?.created_by?.name : '-'}
    //       </div>
    //     </div>
    //   </li>
    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
    //         Created at:
    //       </span>
    //       <div style={{ fontSize: '16px' }}>
    //         {data?.created_at ? changeDateFormat(data?.created_at) : '-'}
    //       </div>
    //     </div>
    //   </li>

    //   <li style={{ padding: '5px 0' }}>
    //     <div>
    //       <div style={{ display: 'flex' }}>
    //         <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
    //           Feature Image:
    //         </span>
    //         {data?.feature_image === '' && <div style={{ fontSize: '16px' }}>{'-'}</div>}
    //       </div>
    //       {data?.feature_image && (
    //         <div style={{ width: '100px', height: '100px' }}>
    //           <img
    //             src={data?.feature_image}
    //             alt=""
    //             style={{ height: '100%', width: '100%', objectFit: 'cover' }}
    //           />
    //         </div>
    //       )}
    //     </div>
    //   </li>

    //   <li style={{ padding: '5px 0' }}>
    //     <div style={{ display: 'flex' }}>
    //       <span style={{ marginRight: '5px', fontWeight: '500', fontSize: '16px' }}>
    //         Description:
    //       </span>
    //       <div
    //         style={{ fontSize: '16px' }}
    //         dangerouslySetInnerHTML={{ __html: data?.description }}
    //       />
    //     </div>
    //   </li>
    // </ol>
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
            src={data?.feature_image}
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
          {data?.created_by?.name && data?.created_by?.name}
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
