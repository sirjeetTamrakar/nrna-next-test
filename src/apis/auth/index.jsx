import { axiosInstance } from "@/apis/_axios";

// login data format {email: "", password: ""}
export const loginApi = (data) => {
  return axiosInstance().post("/api/login", data);
};

// register user
export const registerApi = (data) => {
  return axiosInstance().post(`/api/users`, data);
};

// signup data format = { email: string}
export const forgotPasswordApi = (data) => {
  return axiosInstance().post("/api/forgot-password", data);
};

// reset password or verify email
export const resetPasswordApi = (data) => {
  return axiosInstance().post("/api/reset-password", data);
};

// reset password or verify email
export const changePasswordApi = (data) => {
  return axiosInstance().post("/admin/change-password", data);
};

// // verify email
// export const verifyEmailApi = (data) => {
//   return axiosRequest.post('/api/password-reset/change', dat);
// };

// Complete user registration with new Password and token
export const completeRegistrationApi = (data) => {
  return axiosInstance().post("/api/set-user-password", data);
};
