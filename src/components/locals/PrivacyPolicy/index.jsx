import { getSiteSettings } from "@/redux/homepage/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { settings } = useSelector((state) => state.homepage);

  useEffect(() => {
    dispatch(getSiteSettings());
  }, []);

  return (
    <div className="container" style={{ padding: "40px 0px" }}>
      <div className="policy_page">
        <div style={{ paddingBottom: "20px" }}>
          <h2 style={{ color: "#2C266C" }}>Privacy Policy</h2>
        </div>

        <div className="about_description_single">
          <div
            style={{
              backgroundColor: "#f5f5ff",
              padding: "20px",
              borderRadius: "4px",
            }}
          >
            <div
              className=""
              dangerouslySetInnerHTML={{
                __html: settings?.privacy_policy || "",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
