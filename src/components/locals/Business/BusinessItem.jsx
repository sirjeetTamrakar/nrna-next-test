import Link from "next/link";

const BusinessItem = ({ businessItem, mainGrid }) => {
  return (
    <Link href={`/business/${businessItem.slug}`} className="political_item">
      {/* <div className="img_container"> */}
      <div
        className="img_container"
        style={mainGrid ? { height: "250px" } : { height: "125px" }}
      >
        <img src={businessItem?.image} alt="" />
      </div>
      {/* <div className="political_item_title text-center">{businessItem.fullname}</div> */}
      <div className="political_item_title">{businessItem.fullname}</div>
      <div style={{ marginTop: "-2px" }} className="political_item_smallTitle ">
        {businessItem.email}
      </div>
      <div style={{ marginTop: "-2px" }} className="political_item_smallTitle ">
        {businessItem.phone}
      </div>
      <div
        style={{ marginBottom: "5px", marginTop: "-2px" }}
        className="political_item_smallTitle "
      >
        {businessItem.address}
      </div>
    </Link>
  );
};

export default BusinessItem;
