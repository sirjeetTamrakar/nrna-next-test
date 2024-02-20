import PageBanner from "@/components/globals/PageBanner";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { useSelector } from "react-redux";
import ContactForm from "./Form";

const Contact = ({ siteSettings, handleSubmit }) => {
  const { settings } = useSelector((state) => state.homepage);
  return (
    <>
      <PageBanner
        title={settings?.contact_title}
        subtitle={settings?.contact_subtitle}
        image={settings?.contact_banner_image}
      />
      <section className="contact_page" id="contact_main">
        <div className="container">
          <div className="row">
            <div className="col-md-3 offset-md-1 contact_content_box">
              <div className="contact_content">
                <div className="contact_content_title">Contact Information</div>
                <div className="contact_content_subtitle">
                  Fill up the form to get in touch with the NBNS Global team.
                </div>
                <ul className="contact_list">
                  <li className="contact_list_item_box">
                    <LocationOnIcon />
                    <span className="contact_list_item">
                      {settings?.address || ""}
                    </span>
                  </li>
                  <li className="contact_list_item_box">
                    <PhoneIcon />
                    <span className="contact_list_item">
                      {settings?.phone || ""}
                    </span>
                  </li>
                  <li className="contact_list_item_box">
                    <EmailIcon />
                    <span className="contact_list_item">
                      {settings?.email || ""}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
