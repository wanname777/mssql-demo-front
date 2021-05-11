import {createApp} from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import axios from "axios";
import VueAxios from "vue-axios";
import qs from "qs";
import router from './router'
import store from "./store";

const app = createApp(App).use(store).use(router);
app.use(ElementPlus);
app.use(VueAxios, axios);
app.use(qs);
app.mount("#app");
axios.defaults.baseURL = "http://localhost:8081";
axios.defaults.withCredentials = true;
