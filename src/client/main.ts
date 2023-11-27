import 'vite/modulepreload-polyfill'
import { createApp, ref } from 'vue'
import App from '/app/App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '/app/routes.ts'
import '/css/main.css'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
