import useScreenSize from "@/hooks/useScreenSize";
import { getBusiness, getBusinessCategory } from "@/redux/homepage/actions";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const SingleBusiness = ({ single_business = {} }) => {
  const screenSize = useScreenSize();
  const dispatch = useDispatch();
  const [filteredSingleBusiness, setFilteredSingleBusiness] = useState();
  const { business_category, single_business_loading } = useSelector(
    (state) => state.homepage
  );
  // useEffect(() => {
  //   const filteredSingleCategoryData = business_category?.filter(
  //     (item) => item?.id === Number(single_business?.business_category_id)
  //   );
  //   const newObj = {};

  //   filteredSingleCategoryData.forEach((item, index) => {
  //     newObj[`category${index + 1}`] = item;
  //   });
  //   setFilteredSingleBusiness(newObj);
  // }, [business_category]);

  // useEffect(() => {
  //   slug && dispatch(getSingleBusiness(slug));
  // }, [slug]);
  useEffect(() => {
    dispatch(getBusinessCategory());
    dispatch(getBusiness());
  }, []);

  return (
    <>
      <Head>
        <meta
          name="og:description"
          content={single_business?.description || "Description not available"}
        />
        <meta
          property="og:image"
          content={single_business?.image || "default_image_url"}
        />
        <meta
          property="og:title"
          content={single_business?.fullname || "Business Name"}
        />

        <meta
          property="og:url"
          content={`https://nrna-next-test.vercel.app/business/${
            single_business?.slug || "default_slug"
          }`}
        />
        <meta property="og:type" content="article" />
        <title>{single_business?.fullname || "Business Name"}</title>
        <meta
          name="description"
          content={single_business?.description || "Description not available"}
        />

        {/* Remove author if it's not necessary */}
        {/* <meta property="author" content={single_business?.author || 'Author Name'} /> */}

        <meta name="twitter:card" content={"summary_large_image"} />
        <meta
          name="twitter:title"
          content={single_business?.fullname || "Business Name"}
        />
        <meta
          name="twitter:description"
          content={single_business?.description || "Description not available"}
        />
        <meta
          name="twitter:image"
          content={single_business?.image || "default_image_url"}
        />
        <meta
          name="twitter:url"
          content={`https://nrna-next-test.vercel.app/business/${
            single_business?.slug || "default_slug"
          }`}
        />
      </Head>
    </>
  );
};

export default SingleBusiness;

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://nbns-api.nbnsglobal.com/api/businesses/${params?.slug}`
  )
    .then((response) => response.json())
    .then((json) => json);
  return {
    props: {
      single_business: res?.data,
    },

    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const res = await fetch(`https://nbns-api.nbnsglobal.com/api/businesses`)
    .then((response) => response.json())
    .then((json) => json);
  const paths = res?.data?.map((item) => ({
    params: {
      slug: item?.slug,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
