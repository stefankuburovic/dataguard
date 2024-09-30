import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import infiniteScroll from 'vue-infinite-scroll';
import 'vue-toast-notification/dist/theme-sugar.css';
import App from './App.vue';
import './index.css';

const app = createApp(App);
app.use(infiniteScroll);
app.use(ToastPlugin);
app.mount('#app');