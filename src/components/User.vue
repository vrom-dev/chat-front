<template>
  <span class='username' :style="{color: userColor}">
    {{ user }}
  </span>
</template>

<script >
export default {
  props: {
    user: String,
    userColor: String
  }
}

</script>

<style lang="scss" scoped>
.username {
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  padding: .2rem .2rem;
  transition: all .1s ease-in;
  border-radius: .3rem;
  &:hover {
    background-color: #ebebeb;
    transition: all .1s ease-in;
  }
}
</style>
