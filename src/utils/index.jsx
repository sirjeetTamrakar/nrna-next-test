import { useEffect, useRef, useState } from "react";

// login check
export const isLoggedIn = () =>
  (typeof window !== "undefined" &&
    (localStorage.getItem("token") || localStorage.getItem("token"))) !=
  undefined
    ? true
    : false;
export const getAccounting = () => localStorage.getItem("NewCompany");

export const appVersion = () => {
  return APP_VERSION;
};

export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
};
