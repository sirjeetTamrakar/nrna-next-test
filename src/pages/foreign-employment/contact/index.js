import SecondaryNav from "@/components/globals/SecondaryNav";
import Contact from "@/components/locals/Contact";
import { getAllHomeData, getCandidates } from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ContactPage = () => {
  const [selected, setSelected] = useState("contact");
  const navigate = useRouter();
  const handleFunction = (data) => {
    navigate.push(data);
  };
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.homepage);
  useEffect(() => {
    dispatch(getAllHomeData());
    dispatch(getCandidates());
  }, []);
  const options = [
    {
      title: "Home",
      value: "home",
      clickFunction: () => handleFunction("/foreign-employment"),
    },
    {
      title: "About",
      value: "about",
      clickFunction: () => handleFunction("/foreign-employment/about"),
    },
  ];
  const contact = [
    {
      title: "Contact",
      value: "contact",
      clickFunction: () => handleFunction("/foreign-employment/contact"),
    },
  ];
  const download = [
    {
      title: "Download",
      value: "download",
      clickFunction: () => handleFunction("/foreign-employment/download"),
    },
  ];

  const ourTeam = [
    {
      title: "Our Team",
      value: "our-team",
      clickFunction: () => handleFunction("/foreign-employment/our-team"),
    },
  ];

  const allOptions = [...options, ...ourTeam, ...contact];
  const notCandidateOptions = [...options, ...contact];

  return (
    <>
      <SecondaryNav
        title={"NFEA ( नेपाल वैदेशिक रोजगार संघ )"}
        options={allOptions}
        setSelected={setSelected}
        selected={selected}
      />
      <Contact />
    </>
  );
};

export default ContactPage;
