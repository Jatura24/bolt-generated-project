import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Import global styles
import './style.css'

// Create Pinia instance
const pinia = createPinia()

// Create app instance
const app = createApp(App)

// Install plugins
app.use(pinia)
app.use(router)

// Mount app
app.mount('#app')
