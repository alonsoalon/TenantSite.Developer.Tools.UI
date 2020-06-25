import axios from 'axios'
import store from '@/store'

import lodash from "lodash";


function getBaseUrl() {
    var baseUrl = store.state.admin.app.baseUrl;
    if (baseUrl === "") {
      Message({
        message: "baseUrl 未设置",
        type: type
      });
      throw new error("baseUrl 未设置");
    }
    baseUrl = baseUrl.endsWith("/") ? baseUrl : baseUrl + "/";
    return baseUrl;
  }
  
  // 创建一个 axios 实例
  const service = axios.create({
    baseURL: "",
    timeout: 20000 // 请求超时时间
  });

// 拦截请求
service.interceptors.request.use(
  config => {
    // const token = store.getters.token
    // if (token) {
    //   config.headers.Authorization = 'Bearer ' + token
    // }
    if (!config.url.startsWith("http")) {
        let apiUrl = config.url.startsWith("/")
        ? config.url.substring(1, config.url.length)
        : config.url;
        config.url = getBaseUrl() + apiUrl;
      }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 拦截响应
service.interceptors.response.use(
  response => {
    const res = response.data;
    const { code, success } = res;
    if (code === undefined || success === undefined) {
      // 如果没有 code success 代表这不是项目后端开发的接口
      showErrorMessage("接口返回数据不满足UI要求");
    }
    return res;
  },
  async error => {
    let res = { success: false, code: 0, message: "" };
    if (error.response) {
      var data = error.response.data;
      if (lodash.isPlainObject(data)) {

        var code = 0;
        if(error && error.response && error.response.data && error.response.data.status){
        code= error.response.data.status
        }
        res = {
          success: false,
          code: code,
          message: error.message,
          ...error.response.data
        };
        //console.log(res);
      } else if (lodash.isString(data)) {
        if (lodash.isNumber(error.response.status)) {
          res.code = error.response.status;
        }
        res.message = data || error.response.statusText;
      }
    } else {
      res.message = error.message;
    }
    return res;
  }
);

export default service;

