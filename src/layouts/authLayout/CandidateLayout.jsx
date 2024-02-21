// import SecondaryNav from '@/components/globals/secondaryNav';
import SecondaryNav from "@/components/globals/SecondaryNav";
import { getSingleUser } from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CandidateLayout = ({ children }) => {
  return (
    <>
      <SecondaryNavWrapper />
      {children}
    </>
  );
};

const SecondaryNavWrapper = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("home");
  const navigate = useRouter();
  const { pathname } = navigate;
  const { candidate } = navigate?.query;
  const handleFunction = (data) => {
    navigate.push(data);
  };
  const { single_user } = useSelector((state) => state.homepage);
  useEffect(() => {
    candidate && dispatch(getSingleUser(candidate));
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
