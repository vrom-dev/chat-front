<template>
  <div class='list'>
    <Channel
      v-for="channel in store.state.channelsList"
      :key="channel.id"
      :channel="channel"
    />
  </div>
</template>

<script >
import { onUnmounted } from 'vue'
import { io } from 'socket.io-client'

import { useStore } from 'vuex'

import Channel from './Channel.vue'
export default {
  components: {
    Channel
  },
  setup (props, context) {
    const socket = io('https://twitchchat.herokuapp.com/')
    const store = useStore()

    socket.on('active users', (activeUsers) => {
      store.dispatch('updateActiveUsers', activeUsers)
    })

    onUnmounted(() => {
      socket.close()
    })

    return {
      store
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
