import company from "@/assets/images/company.png";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const BusinessList = ({ data }) => {
  const navigate = useNavigate();
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
    <Box marginY={6}>
      {/* <div className="contact_page_title">Business</div> */}

      <Container>
        <Grid container spacing={2}>
          {data?.business?.length !== 0 ? (
            data?.business?.map((item, index) => {
              return (
                <Grid
                  item
                  sm={3}
                  key={index}
                  onClick={() => navigate(`/business/${item?.slug}`)}
                  sx={{ cursor: "pointer" }}
                >
                  <div
                    style={{
                      // padding: '14px',
                      boxShadow: "0px 8px 20px 0px rgba(18, 17, 39, 0.10)",
                      backgroundColor: "#fff",
                      borderRadius: "6px",
                    }}
                  >
                    <div style={{ width: "100%", height: "150px" }}>
                      <img
                        src={item?.image}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ padding: "5px 15px" }}>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          marginTop: "13px",
                          marginBottom: "2px",
                        }}
                      >
                        {item?.fullname}
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
                        <LocationOnIcon
                          sx={{ color: "#9D9CAF", height: "14px" }}
                        />
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
                  </div>
                </Grid>
              );
            })
          ) : (
            <Box sx={{ fontSize: "25px", marginLeft: "25px" }}>
              No business available
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default BusinessList;
