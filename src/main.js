import { createApp } from 'vue'
import GAuth from 'vue3-google-oauth2'

import App from './App.vue'
import router from './router'
import store from './store'

const gAuthOptions = {
  clientId: '897055106103-se44us8rvn4v7ra420pkh6kvaght3nu3.apps.googleusercontent.com',
  scope: 'email',
  prompt: 'consent',
  fetch_basic_profile: false
}

createApp(App)
  .use(router)
  .use(store)
  .use(GAuth, gAuthOptions)
  .mount('#app')
