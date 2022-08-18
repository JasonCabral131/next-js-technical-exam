import axios from "axios";
const key = 'keyA7UQyT1UeEAUKd'
const axiosInstance = axios.create({
    baseURL: 'https://api.airtable.com/v0/apppEuXVVoYReUqej',
    headers: { authorization: 'Bearer ' + key },
  });
  axiosInstance.interceptors.request.use((req) => {
    
    if (key) {
      req.headers.authorization = `Bearer ${key}` ;
    }
    return req;
  });
  
  export default axiosInstance;