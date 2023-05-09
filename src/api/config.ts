import axios, {
  // AxiosError,
  AxiosInstance,
  // AxiosRequestConfig,
  // AxiosResponse,
  // InternalAxiosRequestConfig,
} from 'axios';

// const apitimeout = 20 * 1000;

// 创建实例
const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  // timeout: apitimeout,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlenceoded; charset=UTF-8',
  // },
  // responseType: 'json',
});

// 请求拦截
// instance.interceptors.request.use((config) => {
//   const { headers } = config;
//   headers['TOKEN'] = '12345';
//   return config;
// });

// 响应拦截
// instance.interceptors.response.use();

// ajax请求
// ctx:请求头等相关参数
const callApi = (url: string, data = {}, ctx = {}, method = 'get') => {
  return new Promise((resolve, reject) => {
    instance({
      url,
      method,
      params: method === 'get' ? data : {},
      data: method === 'post' ? data : {},
      ...ctx,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

// get请求接口
export const getApi = (url: string, data: object, ctx = {}) => callApi(url, data, ctx);
// post请求接口
export const postApi = (url: string, data: object, ctx = {}) => callApi(url, data, ctx, 'post');
