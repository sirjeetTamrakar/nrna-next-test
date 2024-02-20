import { failureToast } from "@/utils/toast";
import axios from "axios";
import TokenService from "./TokenService";

// for multiple requests
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const axiosInstance = () => {
  const baseUrl = process.env.VITE_APP_API;
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
    // headers: {
    //   // 'Content-Type': 'application/x-www-form-urlencoded'

    // }
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  });

  // const handleLogout = () => {
  //   window.location.href = '/';
  //   localStorage.clear();
  // };
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/login" && err.response) {
        // Access Token was expired
        if (
          !originalConfig._retry &&
          err.response.data?.message === "Invalid token."
        ) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                originalConfig.headers["Authorization"] = "Bearer " + token;
                return instance.request(originalConfig);
              })
              .catch((err) => {
                let token = TokenService.getLocalAccessToken();
                if (token == "undefined" || !token) {
                  localStorage.clear();
                  failureToast("Invalid token.");
                  window.location.replace("/");
                }
                return Promise.reject(err);
              });
          }

          originalConfig._retry = true;
          isRefreshing = true;

          try {
            const refreshToken = TokenService.getLocalRefreshToken();
            const rs = await instance
              .post(`/api/refresh/${refreshToken}`)
              .catch(() => {
                localStorage.clear();
                failureToast("Invalid token.");

                window.location.replace("/");
              });
            const { access_token, refresh_token } = rs.data.data.original;
            TokenService.updateLocalAccessToken(access_token);
            TokenService.updateLocalRefreshToken(refresh_token);
            processQueue(null, access_token);
            isRefreshing = false;
            return instance(refresh_token);
          } catch (_error) {
            processQueue(err, null);
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (error.response && error.response.status === 401) {
  //       handleLogout();
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return instance;
};
