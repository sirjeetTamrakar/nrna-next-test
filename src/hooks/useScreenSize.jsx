import { useEffect, useState } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== "undefined" && window.innerWidth,
    height: typeof window !== "undefined" && window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: typeof window !== "undefined" && window.innerWidth,
        height: typeof window !== "undefined" && window.innerHeight,
      });
    };

    typeof window !== "undefined" &&
      window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
