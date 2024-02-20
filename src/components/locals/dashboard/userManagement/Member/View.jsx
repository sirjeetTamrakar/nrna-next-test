import { changeDateFormat } from "@/utils/dateUtils";

const View = ({ data }) => {
  return (
    <ol style={{ paddingTop: "8px", paddingBottom: "8px", listStyle: "none" }}>
      {/* {Object.entries(data)?.map((list, index) => (
        <li key={index}>{list[0] + ' : ' + list[1]}</li>
      ))} */}
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Name:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.full_name ? data?.full_name : "-"}
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
            Country of residence:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.country_of_residence ? data?.country_of_residence : "-"}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Phone:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.phone ? data?.phone : "- "}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            City:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.city ? data?.city : "- "}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Approval status:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.approval_status ? data?.approval_status : "- "}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Type:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.type ? data?.type : "- "}
          </div>
        </div>
      </li>
      <li style={{ padding: "5px 0" }}>
        <div style={{ display: "flex" }}>
          <span
            style={{ marginRight: "5px", fontWeight: "500", fontSize: "16px" }}
          >
            Registration Number:
          </span>
          <div style={{ fontSize: "16px" }}>
            {data?.registration_number ? data?.registration_number : "- "}
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
            {changeDateFormat(data?.created_at)}
          </div>
        </div>
      </li>
    </ol>
  );
};

export default View;
