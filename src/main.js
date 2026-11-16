import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 新增这一行
import './styles/theme.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
