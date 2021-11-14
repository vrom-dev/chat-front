<template>
  <div class="auth-container">
    <AppHeader
      titleText="Twitch chat"
      showLogout
    />
    <div class="content-container">
      <h2 class="subtitle">Explorar</h2>
      <ChannelForm />
      <h3 class="channels-title">Canales</h3>
      <ListOfChannels />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'

import AppHeader from '../components/AppHeader.vue'
import ChannelForm from '../components/ChannelForm.vue'
import ListOfChannels from '../components/ListOfChannels.vue'

export default {
  components: {
    AppHeader,
    ChannelForm,
    ListOfChannels
  },
  setup (props, context) {
    const store = useStore()
    store.dispatch('getChannelsListFromAPI')
  }
}
</script>

<style lang="scss" scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.content-container {
  flex: 1;
  padding: 2rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.7rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
}
.subtitle {
  font-size: 5rem;
  margin-bottom: 2rem;
}

.channels-title {
  border-bottom: 2px solid rgb(119, 44, 232);
  width: max-content;
  color: rgb(119, 44, 232);
  font-size: 1.8rem;
  padding-bottom: 1rem;
  margin-bottom: 0;
}
</style>
