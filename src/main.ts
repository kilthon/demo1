import { createApp } from 'vue';
import { pinia } from '@/store';
import './style.css';
import App from './App.vue';
import router from '@/router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import piniaPersist from 'pinia-plugin-persist';

const app = createApp(App);
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
pinia.use(piniaPersist);

app.use(pinia).use(router).use(ElementPlus).mount('#app');
