import axios from 'axios';
import localStorageService from "./LocalStorage";

axios.interceptors.request.use(
    config => {
      const token = localStorageService.getAccessToken();
      if(token){
        config.headers["Authorization"] = token;
        console.log(token)
      }
      config.headers["Content-Type"] = 'application/json';
      return config;
    },
    error => {
      Promise.reject(error)
    }
  )

export default axios;