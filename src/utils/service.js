/**
 * 这里是ajax的通用访问接口处理
 */
import axios from 'axios'
import './expromise'
import Message from './msgbox'

const showMessage = (message, type = 'error') => {
  Message({
    showClose: true,
    type: type,
    duration: 4000,
    message
  })
}

/**
 * 服务端接口empty字符串跟null返回的结果不同，过滤掉empty字符串
 * @param params
 */
function filterEmptyKey (params) {
  Object.keys(params).forEach(key => {
    if (params[key] === '' || params[key] === null) {
      delete params[key]
    }
  })
}
// const baseUrl = process.env.VUE_APP_BASE_API_URL
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    return {
      baseURL: this.baseUrl,
      timeout: 60000, // request timeout 2分钟
      headers: {
        'Content-Type': 'application/json'
      }
    }
  }

  interceptors (instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      console.log(config, 'config')
      if (config.method === 'post') {
        const params = {
          ...config.data
        }
        filterEmptyKey(params)
        config.data = params
      } else if (config.method === 'get') {
        config.params = {
          ...config.params
        }
        filterEmptyKey(config.params)
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
      const { data, config } = response
      if ((!data.success || data.success === 'false') && data.code !== 200) {
        const msg = data.errorMessage || data.message || '未知错误'
        const code = data.errorCode || data.code || -1000

        // 未手动配置 隐藏 消息提示时，公共提醒错误
        if (!config.hidden) {
          showMessage(`${config.action}失败：${msg}`)
        }

        // 登录权限跳转
        if (code === 401) {
          setTimeout(() => {
            const url = encodeURIComponent(window.location.href)
            window.top.location.href = `/login.html?gotoUrl=${url}`
          }, 1000)
        }

        // return Promise.reject(new Error('请求失败'))
        return Promise.reject({
          code: code,
          message: msg
        })
      }
      return Promise.resolve(response.data)
    },
    error => {
      if (!error.config.hidden) {
        let message = error.message
        if (error.response && error.response.status === 403) {
          message = '您没有该权限'
        } else if (error.response && error.response.status === 502) {
          message = '系统升级中，请稍后重试'
        } else if (error.response && error.response.status === 504) {
          message = '系统超时，请重试'
        }
        showMessage(`${error.config.action}失败：${message}`)
      }
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
