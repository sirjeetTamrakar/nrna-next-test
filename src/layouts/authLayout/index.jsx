import { getSiteSettings } from "@/redux/homepage/actions";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AuthLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteSettings());
  }, []);
  return (
    <Box>
      <Navbar />

      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

// proptypes definition
AuthLayout.propTypes = {
  children: PropTypes.element,
  heading: PropTypes.string,
  isSignIn: PropTypes.bool,
};

// default props
AuthLayout.defaultProps = {
  heading: "Sign IN",
  isSignIn: true,
};
export default AuthLayout;
