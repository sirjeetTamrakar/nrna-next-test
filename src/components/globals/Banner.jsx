import EastIcon from '@mui/icons-material/East';
import Slider from 'react-slick';
const BannerSection = ({ banners }) => {
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
      <Slider {...settings}>
        {banners?.length > 0 ? (
          banners.map((banner, index) => (
            <div key={index}>
              <section className="banner">
                <div
                  className={`banner_item ${banner.title !== '' ? 'overlay' : ''}`}
                  style={{
                    backgroundImage: `url('${banner.image}')`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                  }}>
                  <div className="container">
                    <div className="banner_wrapper">
                      <div>
                        <h1>{banner.title}</h1>
                        <div className="description">{banner.subtitle}</div>
                        {banner.link && (
                          <div className="button_wrapper">
                            <a
                              href={banner.link}
                              target="_blank"
                              className="btn-lg"
                              rel="noreferrer">
                              View More
                              <EastIcon className="button_wrapper_icon" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ))
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
      </Slider>
    </div>
  );
};

export default BannerSection;
