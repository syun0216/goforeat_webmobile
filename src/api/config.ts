import axios from 'axios';
import qs from 'qs';
import { VERSION, webClient } from '../utils/global_params';
import { getToken } from '../utils/auth';

const BASE_URL = process.env.NODE_ENV === 'production' ?
'http://118.25.159.37:15106' : 'http://localhost:3000/api';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 4500
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
service.interceptors.request.use(config => {
  // config.cancelToken = source.token
  if(config.method === 'post') {
    const pdata = qs.parse(config.data);
    config.data = qs.stringify({
      ...pdata,
      sid: getToken(),
      language: 'zh',
      sellClient: webClient,
      appVersion: VERSION
    })
  }else if(config.method === 'get') {
    config.params = {
      ...config.params,
      sid: getToken(),
      language: 'zh',
      sellClient: webClient,
      appVersion: VERSION
    }
  }
  // config.cancelToken = new CancelToken(function executor(c) {
    
  // })
  // console.log(config);
  return config;
},error => {
  Promise.reject(error)
})

service.interceptors.response.use(response => {
  if(response.status === 200) {
    const res = response.data;
    return res;
  }
},err => {
  return Promise.reject(err);
})

export default service;