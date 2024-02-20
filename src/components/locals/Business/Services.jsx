import service_icon from "@/assets/images/service_icon.png";
import Grid from "@mui/material/Grid";

const Services = () => {
  const cardData = [
    {
      icon: service_icon,
      title: "Web development",
      desc: "Communications covers a broad range of services — from data to voice and video calls. An IT provider can configure your communication systems.",
    },
    {
      icon: service_icon,
      title: "Web development",
      desc: "Communications covers a broad range of services — from data to voice and video calls. An IT provider can configure your communication systems.",
    },
    {
      icon: service_icon,
      title: "Web development",
      desc: "Communications covers a broad range of services — from data to voice and video calls. An IT provider can configure your communication systems.",
    },
    {
      icon: service_icon,
      title: "Web development",
      desc: "Communications covers a broad range of services — from data to voice and video calls. An IT provider can configure your communication systems.",
    },
  ];

  return (
    <div>
      <p style={{ fontWeight: "600", fontSize: "16px" }}>Our Services</p>
      <Grid container spacing={3}>
        {cardData?.map((item, index) => {
          return (
            <Grid item lg={4} key={index}>
              <div
                style={{
                  padding: "20px",
                  boxShadow: "0px 8px 20px 0px rgba(18, 17, 39, 0.10)",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                }}
              >
                <div style={{ width: "42px", height: "42px" }}>
                  <img
                    src={item?.icon}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    marginTop: "13px",
                    marginBottom: "4px",
                  }}
                >
                  {item?.title}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                  }}
                >
                  {item?.desc}
                </p>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Services;
