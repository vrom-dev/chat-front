<template>
  <button class='button'>{{buttonText}}</button>
</template>

<script >
export default {
  props: {
    buttonText: String
  }
}
</script>

<style lang="scss" scoped>
.button {
  background-color: rgb(145, 71, 255);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #fff;
  padding: .7rem 1.2rem;
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: .4rem;
  border: none;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: rgb(119, 44, 232);
  }
}
</style>
