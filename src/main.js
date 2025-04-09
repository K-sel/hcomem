import { createApp } from "vue";

import App from "./App.vue";

const myApp = createApp(App);

myApp.mount("#app");

navigator.serviceWorker.register("./sw.js")
