import 'vite/modulepreload-polyfill'
import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from '/app/App.vue'
import routes from '/app/routes.ts'
import '/css/main.css'

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
