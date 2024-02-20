import CustomMasonry from "@/components/globals/customMasonry";
import { getGallery } from "@/redux/homepage/actions";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/styles.css";

const Gallery = () => {
  const dispatch = useDispatch();
  const { gallery, gallery_loading } = useSelector((state) => state.homepage);
  useEffect(() => {
    dispatch(getGallery());
  }, []);

  return (
    <>
      <div className="main_content">
        <section className="all_events">
          <div className="container">
            <div className="about_title" style={{ fontSize: "20px" }}>
              Image Gallery
            </div>
            {gallery_loading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : gallery?.data?.length !== 0 ? (
              <div className="" style={{ marginTop: "50px" }}>
                <div className="">
                  <div>
                    <CustomMasonry>
                      {gallery?.data?.map((item, index) => {
                        return (
                          <div
                            style={{ width: "100%", marginBottom: "2rem" }}
                            key={index}
                          >
                            <ImageCard
                              data={item}
                              images={gallery?.data}
                              index={index}
                            />
                          </div>
                        );
                      })}
                    </CustomMasonry>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-md-12 mt-5 mb-5">
                <h3 className="text-center">No resources available</h3>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

const ImageCard = ({ data, images, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onClick={openModal} style={{ cursor: "pointer" }}>
        <img
          src={data?.gallery_image}
          alt=""
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            borderRadius: "0px 0px 4px 4px",
          }}
        >
          <p style={{ paddingTop: "10px" }}>{data?.title}</p>
        </div>
      </div>

      <Lightbox
        open={isModalOpen}
        close={() => closeModal()}
        slides={images?.map((item) => {
          return { src: item?.gallery_image, description: item?.title };
        })}
        index={index}
        plugins={[Counter, Captions]}
      />
    </>
  );
};

export default Gallery;
