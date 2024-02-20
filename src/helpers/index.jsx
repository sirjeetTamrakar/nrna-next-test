import { customToaster } from "@/utils/toast";

export const getError = (error) => {
  let err;
  if (error?.response?.data?.errors) {
    err = customToaster({
      type: "error",
      message:
        error?.response?.data?.errors &&
        Object?.values(error?.response?.data?.errors)
          ?.map((item) => item)
          ?.join("\n"),
    });
  } else if (error?.response?.data?.message) {
    err = customToaster({
      type: "error",
      message: error?.response?.data?.message,
    });
  }
  return err;
};
export const stringifyData = (array = []) => {
  const data = array?.map((item) => {
    return JSON.stringify(item);
  });
  return data;
};
