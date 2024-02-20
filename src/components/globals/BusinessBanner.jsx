const BannerBusinessSection = ({ banners, singleBanner, ncc, data }) => {
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };
  return (
    <div className="home-slick">
      {/* <Slider {...settings}> */}
      {banners ? (
        <div>
          <section className="banner">
            <div
              className={`banner_item ${data.fullname !== '' ? 'overlay' : ''}`}
              style={{
                backgroundImage: `url('${data?.banner_image}')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}>
              <div className="container">
                <div className="banner_wrapper">
                  <div>
                    <h1>{data?.fullname}</h1>
                    {/* <div className="description">
                      {ncc ? banners.ncc_banner_subtitle : banners.ncc_banner_subtitle}
                    </div> */}
                    {/* {banner.link && (
                         <div className="button_wrapper">
                           <a href={banner.link} target="_blank" className="btn-lg" rel="noreferrer">
                             View More
                             <EastIcon />
                           </a>
                         </div>
                       )} */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <section className="banner">
            <div
              className={`banner_item overlay`}
              style={{
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}>
              <div className="container">
                <div className="banner_wrapper">
                  <div>
                    <h1></h1>
                    <div className="description"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* </Slider> */}
    </div>
  );
};

export default BannerBusinessSection;
