import axios from 'axios';

const BASE_API = 'https://www.omdbapi.com/?apikey=12573023';

export const cancelTokenSource = axios.CancelToken.source();

const axiosInstance = axios.create({
  baseURL: BASE_API,
  cancelToken: cancelTokenSource.token,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;
