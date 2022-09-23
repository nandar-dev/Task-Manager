import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import ElementPlus from "element-plus";
import store from "./store/main.js";
import "element-plus/dist/index.css";
import router from "./router/main.js"

createApp(App).use(router).use(store).use(ElementPlus).mount("#app");
