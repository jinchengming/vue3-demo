import axios from "axios";
import { ElMessage } from "element-plus";

// 全局配置
const service = axios.create({
    baseURL: "http://127.0.0.1:8006/api/v1/",
    timeout: 5000
})

// 响应拦截
service.interceptors.response.use(res => {
    const {code, data, message} = res.data
    if (code == 200) {
        ElMessage.success(message)
        return data
    }else if (code == 500) {
        ElMessage.error(message)
    }
})

function request(options) {
    options.method = options.method || 'get'
    // 当请求为get时  直接采用data传参 这里将data处理为params 
    // 这里便于统一写法
    if (options.method.toLowerCase() === 'get') options.params = options.data
    return service(options)
}

['get','post','put','delete'].forEach(item => {
    request[item] = (url, data) => {
        return request({
            url,
            data,
            method: item
        })
    }
})


export default request