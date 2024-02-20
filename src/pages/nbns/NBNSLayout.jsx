"use client";
// import SecondaryNav from "@/components/globals/SecondaryNav";
// import {
//   getAllHomeData,
//   getCandidates,
//   getNbnsSettings,
// } from "@/redux/homepage/actions";
import { useDispatch } from "react-redux";

const NBNSLayout = ({ children }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getNbnsSettings({ type: "nbns", id: 1 }));
  // });

  return (
    <>
      WorkingFIne
      {children}
    </>
  );
};
export default NBNSLayout;
