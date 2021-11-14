<template>
  <button
    class='options-button'
    @click="handleClick"
    :style="buttonAlignment"
    type="button"
  >
    <slot />
  </button>
</template>

<script >
export default {
  props: {
    handleClick: Function,
    alignSide: String
  },
  setup ({ alignSide }, context) {
    const buttonAlignment = alignSide === 'right'
      ? { right: '1.5rem' }
      : { left: '0' }

    return {
      buttonAlignment
    }
  }
}
</script>

<style lang="scss" scoped>
  .options-button {
    height: 30px;
    width: 30px;
    padding: 0;
    cursor: pointer;
    border: none;
    border-radius: .4rem;
    background-color: transparent;
    transition: all .1s ease-in;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 .5rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      transition: all .1s ease-in;
    }
  }
</style>
