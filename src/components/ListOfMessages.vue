<template>
  <div class='list' ref="list">
    <div class='welcome-message'>
      ¡Te damos la bienvenida a la sala de chat <strong>{{channelName}}</strong>!
    </div>
    <Message v-for="(message, _, index) in messages" :key='index' :message="message"/>
  </div>
</template>

<script >
import { ref, onUpdated } from 'vue'
import Message from './Message.vue'
export default {
  components: {
    Message
  },
  props: {
    messages: Array,
    channelName: String
  },
  setup (props) {
    const list = ref(null)
    onUpdated(() => {
      const listDiv = list.value
      listDiv.scrollTop = listDiv.scrollHeight
    })
    return {
      list
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
