import Link from "next/link";

const NCCItem = ({ nccItem }) => {
  const fullname =
    nccItem?.members?.[0]?.first_name + " " + nccItem?.members?.[0]?.last_name;
  console.log({ nccItem });
  return (
    <Link href={`/ncc/${nccItem.slug}`} className="ncc_item">
      <div className="img_container">
        <img src={nccItem?.logo} alt="" />
      </div>
      <div className="ncc_item_title " style={{ fontSize: "14px" }}>
        {nccItem?.country_name}
      </div>
      <div
        className="ncc_item_title "
        style={{
          fontSize: "11px",
          color: "#6b6b6b",
          marginTop: "-5px",
          height: "25px",
        }}
      >
        {nccItem?.subtitle ?? ""}
      </div>
      <div
        className="ncc_item_title "
        style={{ fontSize: "12px", color: "#2e2e2e", marginTop: "-5px" }}
      >
        {nccItem?.admin?.full_name ?? ""}
      </div>
    </Link>
  );
};

export default NCCItem;
