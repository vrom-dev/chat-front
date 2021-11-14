import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Chat from '../views/Chat.vue'
import Register from '../views/Register.vue'
import Rename from '../views/Rename.vue'
import Login from '../views/Login.vue'
import Explore from '../views/Explore.vue'

const routes = [
  {
    path: '/',
    redirect: () => {
      return { path: '/register' }
    }
  },
  {
    path: '/register',
    component: Register,
    async beforeEnter (to, from, next) {
      await store.dispatch('getUserFromLocalStorage')
      if (!store.state.user) {
        await store.dispatch('getUserFromGoogleToken')
      }
      if (store.state.user) {
        next({ path: '/explore' })
      } else {
        next()
      }
    }
  },
  {
    path: '/rename',
    component: Rename,
    async beforeEnter (to, from, next) {
      await store.dispatch('getUserFromLocalStorage')
      if (!store.state.user || from.path !== '/register') {
        next({ path: '/register' })
      } else {
        next()
      }
    }
  },
  {
    path: '/chat/:id',
    component: Chat,
    async beforeEnter (to, from, next) {
      await store.dispatch('getUserFromLocalStorage')
      if (!store.state.user) {
        next({ path: '/register' })
      } else if (!store.state.channelsList.length) {
        await store.dispatch('getChannelsListFromAPI')
        const result = store.state.channelsList.some(channel => channel.id === to.params.id)

        if (!result) {
          next({ path: '/register' })
        } else {
          next()
        }
      } else {
        next()
      }
    }
  },
  {
    path: '/login',
    component: Login,
    async beforeEnter (to, from, next) {
      await store.dispatch('getUserFromLocalStorage')
      if (!store.state.user) {
        await store.dispatch('getUserFromGoogleToken')
      }
      if (store.state.user) {
        next({ path: '/explore' })
      } else {
        next()
      }
    }
  },
  {
    path: '/explore',
    component: Explore,
    async beforeEnter (to, from, next) {
      await store.dispatch('getUserFromLocalStorage')
      if (!store.state.user) {
        await store.dispatch('getUserFromGoogleToken')
      }
      if (!store.state.user) {
        next({ path: '/register' })
      } else {
        next()
      }
    }
  }
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes
})

export default router
