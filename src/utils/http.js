import HttpRequest from './service'
const BASE_URL = process.env.NODE_ENV === 'development' ? '/api' : process.env.VUE_APP_BASE_API_URL

const axios = new HttpRequest(BASE_URL)

export default axios
