import axios from "axios"
const instance = axios.create({
  baseURL: "https://clear-way.onrender.com",
  // baseURL: "http://127.0.0.1:8000",
})


instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem("persist:root"))}`;
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error && error.response && error.response.data)
        return error.response.data
    return Promise.reject(error);
  });


export default instance