import BusinessList from "@/components/locals/Candidates/CandidateSite/BusinessList";
import { getSingleUser } from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  const { candidate } = useRouter()?.query;
  const { single_user } = useSelector((state) => state.homepage);
  useEffect(() => {
    candidate && dispatch(getSingleUser(candidate));
  }, [candidate]);
  return <BusinessList data={single_user} />;
};

export default index;
