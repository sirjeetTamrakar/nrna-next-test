import CustomModal from "@/components/common/CustomModal/CustomModal";
import useScreenSize from "@/hooks/useScreenSize";
import useToggle from "@/hooks/useToggle";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ServiceView from "./ServiceView";

const ServicesList = ({ data }) => {
  return (
    <Box marginY={6}>
      {/* <div className="contact_page_title">Services</div> */}

      <Container>
        <Grid container spacing={3}>
          {data?.business_service?.length !== 0 ? (
            data?.business_service?.map((item, index) => {
              return <ServiceItem item={item} key={index} />;
            })
          ) : (
            <Box sx={{ fontSize: "25px", marginLeft: "25px" }}>
              No service available
            </Box>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesList;

const ServiceItem = ({ item }) => {
  const [open, openFunction] = useToggle(false);
  const screenSize = useScreenSize();

  return (
    <>
      <Grid item sm={6} md={4} lg={3} sx={{ width: "100%" }}>
        <div
          onClick={openFunction}
          style={{
            boxShadow: "0px 8px 20px 0px rgba(18, 17, 39, 0.10)",
            backgroundColor: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <div style={{ width: "100%", height: "150px" }}>
            <img
              src={item?.service_image}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "10px 15px" }}>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "600",
                marginTop: "13px",
                marginBottom: "4px",
                display: "-webkit-box",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                height: "36px",
              }}
            >
              {item?.title}
            </p>
            <div style={{ height: "90px" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.description?.substring(0, 115),
                }}
              />
            </div>
            {/* <p
              style={{
                fontSize: '12px',
                fontWeight: '400',
                height: '65px'
              }}>
              {item?.description?.length < 114
                ? item?.description
                : `${item?.description.substring(0, 115)}...`}
            </p> */}
          </div>
        </div>
      </Grid>
      <CustomModal
        open={open}
        handleClose={openFunction}
        modalTitle={item?.title}
        width={`${screenSize?.width < 970 ? "20rem" : "60rem"}`}
      >
        <ServiceView item={item} />
      </CustomModal>
    </>
  );
};
