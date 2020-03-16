import axios from 'axios';

const baseUrl: string = 'http://192.168.20.247:8081';

const service = axios.create({
  // 使用easy mock 来做数据模拟 heweiBaseUrl huangdaxia
  // baseURL + url
  baseURL: baseUrl,
  headers: {
    //   get: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    //   },
    post: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  },
  // 是否跨站点访问控制请求
  withCredentials: true,
  // transformRequest: [
  //   data => {
  //     data = JSON.stringify(data)
  //     return data
  //   },
  // ],
  // validateStatus() {
  //   // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
  //   return true
  // },
  // transformResponse: [
  //   data => {
  //     if (typeof data === 'string' && data.startsWith('{')) {
  //       data = JSON.parse(data)
  //     }
  //     return data
  //   },
  // ],
  timeout: 5000, // 超时中断
});

const showStatus = (status: number): string => {
  let message: string = '';
  switch (status) {
    case 400:
      message = '请求错误(400)';
      break;
    case 401:
      message = '未授权，请重新登录(401)';
      break;
    case 403:
      message = '拒绝访问(403)';
      break;
    case 404:
      message = '请求出错(404)';
      break;
    case 408:
      message = '请求超时(408)';
      break;
    case 500:
      message = '服务器错误(500)';
      break;
    case 501:
      message = '服务未实现(501)';
      break;
    case 502:
      message = '网络错误(502)';
      break;
    case 503:
      message = '服务不可用(503)';
      break;
    case 504:
      message = '网络超时(504)';
      break;
    case 505:
      message = 'HTTP版本不受支持(505)';
      break;
    default:
      message = `连接出错(${status})!`;
  }
  return `${message}，请检查网络或联系管理员！`;
};

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.method = 'post';
    // 防止post请求参数无法传到后台  在这里就用到了qs
    // config.params = QS.stringify(config.params)
    return config;
  },
  error => {
    // 错误抛到业务代码
    // 判断错误 编号
    if (typeof error.response !== 'undefined') {
      const status = error.response.status;
      if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        let msg = showStatus(status);
        if (typeof error.response.data === 'string') {
          error.response.data = {msg};
        } else {
          error.response.data.msg = msg;
        }
      }
    }
    return Promise.resolve(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 判断超时 重新请求仅一次
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      let newHttp = new Promise(function(resolve) {
        resolve();
      });
      // 返回一个promise实例，同时重新发起请求，config请求配置，包扩请求头和请求参数
      return newHttp.then(function() {
        return axios(error.config);
      });
    }

    // 判断错误 编号
    if (typeof error.response !== 'undefined') {
      const status = error.response.status;
      if (status < 200 || status >= 300) {
        // 处理http错误，抛到业务代码
        let msg = showStatus(status);
        if (typeof error.response.data === 'string') {
          error.response.data = {msg};
        } else {
          error.response.data.msg = msg;
        }
      }
    }

    return Promise.resolve(error.response.data);
  },
);

export default service;
