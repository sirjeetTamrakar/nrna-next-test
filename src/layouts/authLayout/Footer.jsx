"use client";
import appStoreImage from "@/assets/images/appStore.png";
import googlePlayImage from "@/assets/images/googlePlay.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_wrapper">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="copyright">
              Copyright &copy; 2024. All right Reserved. | NBNS Global
            </div>
            <div className="terms">
              <Link
                href="/privacy-policy"
                className="copyright"
                style={{ color: "#fff" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="copyright"
                style={{ color: "#fff" }}
              >
                Terms and Conditions
              </Link>
            </div>
          </div>
          <div>
            <div className="app-download">
              <a
                href="https://play.google.com/store/apps/details?id=com.scodus.nrna&hl=en&gl=US"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={googlePlayImage}
                  alt="Google Play Store"
                  width="100"
                  height="33"
                />
              </a>
              <a
                href="https://apps.apple.com/np/app/nbns-global/id6469577666"
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  src={appStoreImage}
                  alt="Apple Store"
                  width="100"
                  height="33"
                />
              </a>
            </div>

            <div className="designed_by">
              Designed By
              <a target="_blank" href="https://scodus.com" rel="noreferrer">
                {" "}
                Scodus Inovations Pvt Ltd
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
