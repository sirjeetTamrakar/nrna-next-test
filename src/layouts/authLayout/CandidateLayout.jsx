import { Box } from "@mui/material";
// import SecondaryNav from '@/components/globals/secondaryNav';
import SecondaryNav from "@/components/globals/SecondaryNav";
import { getSingleUser } from "@/redux/homepage/actions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const CandidateLayout = () => {
  return (
    <>
      <Navbar />
      <SecondaryNavWrapper />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
};

const SecondaryNavWrapper = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("home");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { candidate } = useParams();
  const handleFunction = (data) => {
    navigate(data);
  };
  const { single_user } = useSelector((state) => state.homepage);
  useEffect(() => {
    dispatch(getSingleUser(candidate));
  }, [candidate]);
  useEffect(() => {
    pathname &&
      setSelected(options?.find((list) => list?.path == pathname)?.value);
  }, [pathname]);
  const options = [
    {
      title: "Home",
      value: "home",
      path: `/${candidate}`,
      clickFunction: () => handleFunction(`/${candidate}`),
    },
    {
      title: "News",
      value: "news",
      path: `/${candidate}/news`,
      clickFunction: () => handleFunction(`/${candidate}/news`),
    },
    {
      title: "Business",
      value: "business",
      path: `/${candidate}/business`,
      clickFunction: () => handleFunction(`/${candidate}/business`),
    },
    {
      title: "Contact",
      value: "contact",
      path: `/${candidate}/contact`,
      clickFunction: () => handleFunction(`/${candidate}/contact`),
    },
  ];
  return (
    <SecondaryNav
      title={single_user?.full_name}
      options={options}
      setSelected={setSelected}
      selected={selected}
    />
  );
};

export default CandidateLayout;
