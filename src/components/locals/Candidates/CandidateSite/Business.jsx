import company from "@/assets/images/company.png";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";

const Business = () => {
  const cardData = [
    {
      icon: company,
      company: "Scodus Innovation",
      company_status: "IT Company",
      address: "Kalikasthan, Kathmandu",
      email: "guyHawkings@gmail.com",
    },
    {
      icon: company,
      company: "Scodus Innovation",
      company_status: "IT Company",
      address: "Kalikasthan, Kathmandu",
      email: "guyHawkings@gmail.com",
    },
    {
      icon: company,
      company: "Scodus Innovation",
      company_status: "IT Company",
      address: "Kalikasthan, Kathmandu",
      email: "guyHawkings@gmail.com",
    },
    {
      icon: company,
      company: "Scodus Innovation",
      company_status: "IT Company",
      address: "Kalikasthan, Kathmandu",
      email: "guyHawkings@gmail.com",
    },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        {cardData?.map((item, index) => {
          return (
            <Grid item sm={4} key={index}>
              <div
                style={{
                  padding: "14px",
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
                    fontSize: "13px",
                    fontWeight: "500",
                    marginTop: "13px",
                    marginBottom: "2px",
                  }}
                >
                  {item?.company}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "#6C6B80",
                  }}
                >
                  {item?.company_status}
                </p>
                <span style={{ display: "flex" }}>
                  <LocationOnIcon sx={{ color: "#9D9CAF", height: "14px" }} />
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#383751",
                      marginBottom: "4px",
                    }}
                  >
                    {item?.address}
                  </p>
                </span>
                <span style={{ display: "flex" }}>
                  <EmailIcon sx={{ color: "#9D9CAF", height: "14px" }} />
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "400",
                      color: "#383751",
                      marginBottom: "4px",
                    }}
                  >
                    {item?.email}
                  </p>
                </span>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Business;
