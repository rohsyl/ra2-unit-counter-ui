import 'vite/modulepreload-polyfill'
import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// @ts-ignore
import App from './app/App.vue'
import '/css/main.css'
import ConfigProvider from "./app/providers/ConfigProvider";
ConfigProvider.loadConfig()
import getRoutes from './app/routes'

const router = createRouter({
    history: createWebHistory(),
    routes: getRoutes(),
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')