import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // 前端配置跨域写法，这里不开放 采用后端解决
    // proxy: {
    //   '/api':{
    //     target: "http://127.0.0.1:8006/"
    //   }
    // }
  }
})