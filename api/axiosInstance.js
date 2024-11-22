import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.themealdb.com/api/json/v1/1/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request URL : ", config.baseURL + config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
