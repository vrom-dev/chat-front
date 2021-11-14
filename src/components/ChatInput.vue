<template>
  <textarea
    class='custom-textarea'
    :value="modelValue"
    @input="updateValue"
    @keydown.exact.enter.prevent="handleSubmit"
    @keydown="resizeTextarea"
    @keyup="resizeTextarea"
    maxlength="500"
    placeholder="Enviar un mensaje"
    :style="{height: height}"
  >
  </textarea>
</template>

<script >
import { ref } from 'vue'

export default {
  props: {
    modelValue: String
  },
  setup (props, { emit }) {
    const height = ref('28px')

    const resizeTextarea = (e) => {
      const textareaContent = e.target.value.trim().length
      const newHeight = textareaContent === 0
        ? 28
        : Math.max(e.target.scrollHeight, e.target.clientHeight)

      const maxHeight = newHeight > 80 ? 80 : newHeight
      height.value = maxHeight + 'px'
    }

    const updateValue = (e) => {
      emit('update:modelValue', e.target.value.trim())
    }

    const handleSubmit = (e) => {
      emit('submit:modelValue', e.target.value.trim())
    }

    return {
      height,
      resizeTextarea,
      updateValue,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-textarea {
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 13px;
  font-family: inherit;
  color: rgb(14, 14, 16);
  border-radius: 0.2rem;
  border: none;
  outline-color: rgba(0, 0, 0, 0.2);
  outline-width: 1px;
  outline-style: solid;
  resize: none;
  transition: all 0.1s ease-in;
  display: block;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  overflow-y: auto;
  &:hover {
    outline-width: 2px;
    transition: all 0.1s ease-in;
  }
  &:focus {
    outline-width: 2px;
    outline-color: rgb(119, 44, 232);
    transition: all 0.1s ease-in;
    background-color: #fff;
  }
}
</style>
