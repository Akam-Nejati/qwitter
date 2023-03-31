import App from './App.vue'
// import { createPinia } from "pinia";
import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { pinia } from './plugins/pinia';
// const pinia = createPinia();
const app = createApp(App);

registerPlugins(app)
pinia(app)
// app.use(pinia);
app.mount('#app')
