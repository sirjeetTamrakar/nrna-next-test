import ServicesList from "@/components/locals/Business/ServicesList";
import { getSingleBusiness } from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ServiceListPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { slug } = router.query;
  const { single_business } = useSelector((state) => state.homepage);
  useEffect(() => {
    slug && dispatch(getSingleBusiness(slug));
  }, [slug]);

  return <ServicesList data={single_business} />;
};

export default ServiceListPage;
