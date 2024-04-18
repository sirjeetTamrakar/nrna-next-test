import SecondaryNav from "@/components/globals/SecondaryNav";
import { getSingleBusiness } from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const BusinessLayout = ({ children }) => {
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
  const { slug } = navigate?.query;
  const { pathname } = useRouter();
  const handleFunction = (data) => {
    navigate.push(data);
  };
  const { single_business } = useSelector((state) => state.homepage);
  useEffect(() => {
    slug && dispatch(getSingleBusiness(slug));
  }, [slug]);
  useEffect(() => {
    pathname &&
      setSelected(options?.find((list) => list?.path == pathname)?.value);
  }, [pathname]);
  const options = [
    {
      title: "Home",
      value: "home",
      path: `/business/${slug}`,
      clickFunction: () => handleFunction(`/business/${slug}`),
    },
    {
      title: "Services",
      value: "services",
      path: `/business/${slug}/services`,
      clickFunction: () => handleFunction(`/business/${slug}/services`),
    },
    {
      title: "Contact",
      value: "contact",
      path: `/business/${slug}/contact`,
      clickFunction: () => handleFunction(`/business/${slug}/contact`),
    },
  ];
  return (
    <SecondaryNav
      title={single_business?.fullname}
      options={options}
      setSelected={setSelected}
      selected={selected}
      business
      single_business={single_business}
    />
  );
};

export default BusinessLayout;
