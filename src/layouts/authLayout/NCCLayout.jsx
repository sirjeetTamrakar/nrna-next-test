import CustomLoader from "@/components/common/CustomLoader/CustomLoader";
import SecondaryNav from "@/components/globals/SecondaryNav";
import {
  getAllHomeData,
  getSingleNCC,
  getSiteSettings,
} from "@/redux/homepage/actions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const NCCLayout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { ncc: slug } = router?.query;
  const { ncc } = useSelector((state) => state.homepage);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const single = ncc?.data?.find((list) => list?.slug == slug);
    console.log({ single });
    single?.id && dispatch(getSiteSettings({ type: "ncc", id: single?.id }));
  }, [ncc]);
  return (
    <>
      {/* <Navbar /> */}
      <SecondaryNavWrapper />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default NCCLayout;

const SecondaryNavWrapper = () => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState("home");
  const navigate = useRouter();
  const { pathname, query } = useRouter();
  const { ncc } = query;
  const handleFunction = (data) => {
    navigate.push(data);
  };
  const { single_ncc, single_ncc_loading } = useSelector(
    (state) => state.homepage
  );

  useEffect(() => {
    ncc && dispatch(getSingleNCC(ncc));
  }, [ncc]);
  useEffect(() => {
    // pathname && setSelected(options?.find((list) => list?.path == pathname)?.value);
    if (pathname) {
      const currentOption = options.find((list) =>
        pathname.includes(list?.value)
      );
      pathname && setSelected(currentOption?.value);
    }
  }, [pathname]);

  const options = [
    {
      title: "Home",
      value: "home",
      path: `/ncc/${ncc}`,
      clickFunction: () => handleFunction(`/ncc/${ncc}`),
    },
    {
      title: "About",
      value: "about",
      path: `/ncc/${ncc}/about`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/about`),
    },
    {
      title: "Candidates",
      value: "candidate",
      path: `/ncc/${ncc}/candidate`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/candidate`),
    },
    {
      title: "Business",
      value: "business",
      path: `/ncc/${ncc}/business`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/business`),
    },
    {
      title: "Our Team",
      value: "team",
      path: `/ncc/${ncc}/committee`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/committee`),
    },
    {
      title: "News",
      value: "news",
      path: `/ncc/${ncc}/news`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/news`),
    },
    {
      title: "Events",
      value: "events",
      path: `/ncc/${ncc}/events`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/events`),
    },
    {
      title: "Contact",
      value: "contact",
      path: `/ncc/${ncc}/contact`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/contact`),
    },
    {
      title: "Downloads",
      value: "downloads",
      path: `/ncc/${ncc}/downloads`,
      clickFunction: () => handleFunction(`/ncc/${ncc}/downloads`),
    },
    // {
    //   title: 'Mission',
    //   value: 'mission',
    //   path: `/ncc/${ncc}/mission`,
    //   clickFunction: () => handleFunction(`/ncc/${ncc}/mission`)
    // },
    // {
    //   title: 'Vision',
    //   value: 'vision',
    //   path: `/ncc/${ncc}/vision`,
    //   clickFunction: () => handleFunction(`/ncc/${ncc}/vision`)
    // }
  ];

  const { home_data } = useSelector((state) => state.homepage);

  useEffect(() => {
    const data = {
      type: "ncc",
      id: single_ncc?.id,
    };
    single_ncc?.id && dispatch(getAllHomeData(data));
  }, [single_ncc?.id]);
  const homeOptions = (home_data?.data?.slice(0, 4) || []).map((item) => ({
    title: item?.tabtitle,
    value: item?.slug,
    clickFunction: () => handleFunction(`/ncc/${ncc}/${item.slug}`),
  }));

  // const allOptions = [...options, ...homeOptions, ...contact, ...download];
  const allOptions = [...options];
  if (single_ncc_loading) {
    return <CustomLoader />;
  }

  return (
    <SecondaryNav
      title={`NCC > ${single_ncc?.country_name}`}
      color={single_ncc?.color}
      options={allOptions}
      setSelected={setSelected}
      selected={selected}
      ncc
    />
  );
};
