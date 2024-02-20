import { changeDateFormat } from "@/utils/dateUtils";

const ViewContact = ({ data }) => {
  // if (selectedFile) {
  //   const img = new Image();
  //   img.src = URL.createObjectURL(selectedFile);
  //   img.onload = () => {
  //     const width = img.width;
  //     const height = img.height;
  //     setResolution(`${width} x ${height}`);
  //   };

  return (
    <ol style={{ paddingTop: "8px", paddingBottom: "8px", listStyle: "none" }}>
      {/* {Object.entries(data).map((entry, index) => {
        const [key, value] = entry;

        // Exclude property
        if (key === 'description' || key === 'feature_image') {
          return null;
        }

        return (
          <li style={{ padding: '5px 0' }} key={index}>
            {key + ' : ' + value}
          </li>
        );
      })} */}
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Name:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.name ? data?.name : "-"}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Email:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.email ? data?.email : "-"}
          </div>
        </div>
      </li>

      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Created at:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.created_at ? data?.created_at : "-"}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Updated at:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.updated_at ? changeDateFormat(data?.updated_at) : "-"}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Subject:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.subject ? data?.subject : "-"}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Message:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.description ? data?.description : "-"}
          </div>
        </div>
      </li>
    </ol>
  );
};

export default ViewContact;
