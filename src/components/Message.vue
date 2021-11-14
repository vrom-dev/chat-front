<template>
  <div class='message-text'>
    <User
      :user="message.username"
      :userColor="message.userColor"
    />: {{message.content}}
  </div>
</template>

<script >
import User from './User.vue'
export default {
  props: {
    message: Object
  },
  components: { User }
}
</script>

<style lang="scss" scoped>
.message-text {
  word-break: break-all;
  padding: .5rem;
  border-radius: 0.4rem;
  font-size: 1.3rem;
  line-height: 2rem;
  transition: all .1s ease-in;
  &:hover {
    background-color: #f8f8f8;
    transition: all .1s ease-in;
  }
}
</style>
