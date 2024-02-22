import BusinessLayout from "@/layouts/authLayout/BusinessLayout";
import CandidateLayout from "@/layouts/authLayout/CandidateLayout";
import Footer from "@/layouts/authLayout/Footer";
import NBNSLayout from "@/layouts/authLayout/NBNSLayout";
import NCCLayout from "@/layouts/authLayout/NCCLayout";
import Navbar from "@/layouts/authLayout/Navbar";
import MainLayout from "@/layouts/dashboardLayout";
import { setGlobalUser } from "@/redux/auth/actions";
import { getContinents, getSiteSettings } from "@/redux/homepage/actions";
import Store from "@/redux/store";
import theme from "@/themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../styles/globals.css";
import "../styles/main.scss";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(
    (router.pathname.includes("/news/") &&
      !router.pathname.includes("/dashboard")) ||
      false
  );
  // router.pathname.includes("/news/") ||

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Provider store={Store}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Layouts Component={Component} pageProps={pageProps} />
            <ToastContainer
              position="bottom-right"
              autoClose={4000}
              limit={3}
              draggablePercent={50}
            />
          </ThemeProvider>
        </Provider>
      ) : (
        <></>
      )}
    </>
  );
}

const Layouts = ({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSiteSettings());
    dispatch(setGlobalUser());
    dispatch(getContinents());
  }, []);
  let DynamicLayout;
  if (router.pathname.startsWith("/nbns") || router.pathname === "/") {
    DynamicLayout = NBNSLayout;
  } else if (router.pathname.startsWith("/ncc/")) {
    DynamicLayout = NCCLayout;
  } else if (router.pathname.startsWith("/business/")) {
    DynamicLayout = BusinessLayout;
  } else if (router.pathname.startsWith("/business/")) {
    DynamicLayout = BusinessLayout;
  } else if (router.pathname.startsWith("/[candidate]")) {
    DynamicLayout = CandidateLayout;
  } else {
    // Default layout for other pages
    DynamicLayout = ({ children }) => <>{children}</>;
  }

  return (
    <>
      {router.pathname.startsWith("/dashboard") ? (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      ) : (
        <>
          <Navbar />
          <DynamicLayout>
            <Component {...pageProps} />
          </DynamicLayout>
          <Footer />
        </>
      )}
    </>
  );
};
