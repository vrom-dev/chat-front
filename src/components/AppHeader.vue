<template>
  <header class='app-header'>
    <button class='logout'
      v-show="showLogout"
      @click="logout"
    >Log out</button>
    <h1 class='app-title'>{{titleText}}</h1>
    <OptionsButton
      :onClick="toggle"
      alignSide='right'
      v-show="showChat"
    >
      <ActiveUsersSVG />
    </OptionsButton>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import OptionsButton from './OptionsButton.vue'
import ActiveUsersSVG from '../assets/active-users.svg?component'

export default {
  props: {
    titleText: String,
    showChat: Boolean,
    showLogout: Boolean,
    toggle: Function
  },
  components: { OptionsButton, ActiveUsersSVG },
  setup () {
    const router = useRouter()
    const store = useStore()

    const logout = () => {
      window.localStorage.removeItem('chat:sessiontoken')
      store.commit('setUser', null)
      store.commit('setChannelsList', [])
      router.push('/')
    }

    return {
      logout
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
  border-bottom-style: solid;
  position: relative;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-title {
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 600;
}
.logout {
    height: 30px;
    font-size: 1.3rem;
    cursor: pointer;
    border: none;
    border-radius: .4rem;
    background-color: transparent;
    transition: all .1s ease-in;
    position: absolute;
    left: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .7rem;
    font-size: 1.3rem;
    border-radius: .4rem;
    border: none;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      transition: all .1s ease-in;
    }
}
</style>
