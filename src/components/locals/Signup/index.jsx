import Register from "@/components/globals/register";
import { useEffect } from "react";

const Signup = () => {
  const pathname = window.location.pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="container" style={{ padding: "40px 400px" }}>
      <Register signupPage />
    </div>
  );
};

export default Signup;
