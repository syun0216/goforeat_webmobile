import axios from 'axios';
import qs from 'qs';

const BASE_URL = 'http://api.goforeat.hk';

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 4500
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
service.interceptors.request.use(config => {
  // config.cancelToken = source.token
  if(config.method == 'post') {
    let _data = qs.parse(config.data);
    config.data = qs.stringify({
      ..._data,
      sid: store.getState().auth.sid,
      language: store.getState().language.language,
      sellClient: currentPlatform,
      appVersion: getVersion()
    })
  }else if(config.method == 'get') {
    config.params = {
      ...config.params,
      sid: store.getState().auth.sid,
      language: store.getState().language.language,
      sellClient: currentPlatform,
      appVersion: getVersion()
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
  if(response.status == 200) {
    const res = response.data;
    return res;
  }
},err => {
  return Promise.reject(err);
})

export default service;