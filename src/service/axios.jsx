import axios from "axios"
const instance = axios.create({
  baseURL: "https://clear-way.onrender.com",
  // baseURL: "http://127.0.0.1:8000",
})

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    try {
      const persistedData = JSON.parse(localStorage.getItem("persist:root"));
      const user = persistedData ? JSON.parse(persistedData.user) : null;
      const currentUser = user ? user.currentUser : null;
      const token = currentUser ? currentUser.access_token : null;
      if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
        console.error('Error parsing token from localStorage:', error);
    }
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