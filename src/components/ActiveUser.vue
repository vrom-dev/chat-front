<template>
  <div class='message-text'>
    {{ username }}
  </div>
</template>

<script >
export default {
  props: {
    username: String
  }
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
  color: rgb(92, 22, 197);
  &:hover {
    background-color: #f8f8f8;
    transition: all .1s ease-in;
  }
}
</style>
