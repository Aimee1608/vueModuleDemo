import 'babel-polyfill'
import axios from 'axios'
import qs from 'qs'
// import { MessageBox } from 'element-ui'
axios.defaults.withCredentials = true
let CancelToken = axios.CancelToken
// 拦截request,设置全局请求为ajax请求
axios.interceptors.request.use(function (config) {
  config.headers['prelogid'] = window.xesWeb_eventLog.getCookie_log('prelogid') || ''
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.timeout = 7000 // 超时设置
  let cancelGroupName
  if (config.method === 'post') {
    if (config.data && config.data.cancelGroupName) { // post请求ajax取消函数配置
      cancelGroupName = config.data.cancelGroupName
    }
    config.data = qs.stringify(config.data)
  } else {
    if (config.params && config.params.cancelGroupName) { // get请求ajax取消函数配置
      cancelGroupName = config.params.cancelGroupName
    }
  }
  if (cancelGroupName) {
    if (axios[cancelGroupName] && axios[cancelGroupName].cancel) {
      axios[cancelGroupName].cancel()
    }
    config.cancelToken = new CancelToken(c => {
      axios[cancelGroupName] = {}
      axios[cancelGroupName].cancel = c
    })
  }
  return config
})

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use(function (response) {
  const data = response.data
  // 根据返回的code值来做不同的处理（和后端约定）
  // switch (data.stat) {
  //   case 9: // 登录失效 刷新页面
  //     window.location.reload()
  //     break;
  // }
  // 若不是正确的返回code，就抛出错误
  // const err = new Error(data.description)

  // err.data = data
  // err.response = response

  // throw err
  return data
}, function (err) { // 这里是返回状态码不为200时候的错误处理
  // flag = true
  // clearTimeout(timer)
  // loading && loading.close()
  if (err.code == 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) { // 超时处理
    
  }
                                                        
  // if (err && err.response) {
  //   switch (err.response.status) {
  //     case 400:
  //       err.message = '请求错误'
  //       break
  //     case 401:
  //       err.message = '未授权，请登录'
  //       break
  //     case 403:
  //       err.message = '拒绝访问'
  //       break
  //     case 404:
  //       err.message = '请求地址出错: ' + err.response.config.url
  //       break
  //     case 408:
  //       err.message = '请求超时'
  //       break
  //     case 500:
  //       err.message = '服务器内部错误'
  //       break
  //     case 501:
  //       err.message = '服务未实现'
  //       break
  //     case 502:
  //       err.message = '网关错误'
  //       break
  //     case 503:
  //       err.message = '服务不可用'
  //       break
  //     case 504:
  //       err.message = '网关超时'
  //       break
  //     case 505:
  //       err.message = 'HTTP版本不受支持'
  //       break
  //     default:
  //   }
  // }
  return Promise.reject(err)
})
export default axios
