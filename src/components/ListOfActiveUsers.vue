<template>
  <div class='list' ref="list">
    <div class='welcome-message'>
      Usuarios en este chat:
    </div>
    <ActiveUser
      v-for="user in activeUsers"
      :key="user"
      :username='user'
    />
  </div>
</template>

<script >
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

import ActiveUser from './ActiveUser.vue'
export default {
  components: {
    ActiveUser
  },
  setup (props, context) {
    const route = useRoute()
    const store = useStore()

    const channelId = route.params.id

    return {
      activeUsers: computed(() => store.state.channelsList
        .find(channel => channel.id === channelId)
        .activeUsers)
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  flex: 1;
  overflow-y: scroll;
  padding: 1rem;
  &::-webkit-scrollbar {
    width: .7rem;
  }
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 1rem;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #aaa;
  }
}
.welcome-message {
  padding: .5rem;
}
strong, .welcome-message {
  font-size: 1.3rem;
  color: rgb(83, 83, 95);
  line-height: 2rem;
}
</style>
