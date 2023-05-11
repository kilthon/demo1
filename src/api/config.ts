// axios二次封装

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  // InternalAxiosRequestConfig,
} from 'axios';
import { ElMessage } from 'element-plus';

// const apitimeout = 20 * 1000;

// interface result<T = any> {
//   code: number;
//   msg: string;
//   data: T;
// }

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
// instance.interceptors.request.use((config:AxiosRequestConfig) => {
//   const { headers } = config;
// headers['TOKEN'] = '12345';
//   return config;
// },(error:AxiosError)=>{
//   Message.error(error.message)
//   return Promise.reject(error)
// });

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg, data } = response.data;
    if (code === 200) {
      return data;
    } else {
      ElMessage.error(msg);
      return Promise.reject(new Error(msg));
    }
  },
  (error: AxiosError) => {
    let message = '';
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = 'token失效，请重新登陆';
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求地址错误';
        break;
      case 500:
        message = '服务器故障';
        break;
      default:
        message = '网络连接故障';
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
);

export const http = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config);
  },
  post<T = any>(url: string, data: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config);
  },
  put<T = any>(url: string, data: object, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config);
  },
};

// ajax请求
// ctx:请求头等相关参数
// const callApi = (url: string, data = {}, ctx = {}, method = 'get'): Promise<T> => {
//   return new Promise((resolve, reject) => {
//     instance({
//       url,
//       method,
//       params: method === 'get' ? data : {},
//       data: method === 'post' ? data : {},
//       ...ctx,
//     })
//       .then((res: AxiosResponse) => resolve(res))
//       .catch((err: AxiosError) => reject(err));
//   });
// };

// // get请求接口
// export const getApi = (url: string, data: object, config: AxiosRequestConfig = {}) => {
//   return callApi(url, data, config);
// };
// // post请求接口
// export const postApi = (url: string, data: object, ctx = {}) => callApi(url, data, ctx, 'post');
