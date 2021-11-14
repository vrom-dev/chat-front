<template>
  <div class='google-auth-container'>
    <GoogleIcon class='google-icon'/>
    <button @click="handleClickSignIn" class='google-button'>
      {{ labelText }}
    </button>
  </div>
</template>

<script >
import { inject, toRefs } from 'vue'
import GoogleIcon from '../assets/google-logo.svg?component'

import { loginWithGoogleToken } from '../services/user'
import store from '../store'
import router from '../router'

export default {
  props: {
    labelText: String
  },
  components: {
    GoogleIcon
  },
  methods: {
    async handleClickSignIn () {
      try {
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }
        const response = await loginWithGoogleToken(googleUser.getAuthResponse().id_token)
        store.commit('setUser', response.data)
        window.localStorage.setItem('chat:sessiontoken', JSON.stringify(response.data))
        if (response.status === 201) {
          return router.push({ path: '/rename' })
        }
        router.push('/explore')
      } catch (error) {
        console.error(error)
      }
    }
  },
  setup (props) {
    const { isSignIn } = toRefs(props)
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    const handleClickLogin = () => {}
    return {
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn
    }
  }
}
</script>

<style lang="scss" scoped>
.google-auth-container {
  display: flex;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: .4rem;
  background-color: rgba(0, 0, 0, 0.05);
  width: 195px;
  height: max-content;
  &:hover > .google-icon {
    filter: opacity(.95);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.google-auth-container[disabled] {
  display: flex;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: .4rem;
  background-color: rgba(0, 0, 0, 0.5);
  width: 195px;
  height: max-content;
  &:hover > .google-icon {
    filter: opacity(.95);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.google-button {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: transparent;
  color: #444;
  cursor: pointer;
  font-size: 1.3rem;
  border: none;
}
</style>
