import { createApp } from 'vue'
import App from './App.vue'
import YUI from './packages'

const app = createApp(App)
app.use(YUI)
app.mount('#app')
