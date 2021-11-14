<template>
  <input
    :type="type"
    :name="id"
    :placeholder="placeholder"
    class="input"
    @input="updateValue"
    :value="modelValue"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
    labelText: String,
    id: String,
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  setup (props, { emit }) {
    const updateValue = (e) => {
      emit('update:modelValue', e.target.value.trim())
    }
    return {
      updateValue
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  height: 40px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.4rem;
  display: block;
  font-size: 1.3rem;
  padding: 1rem;
  margin-bottom: 1rem;
  outline: none;
  background-color: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.6);
  transition: all 0.1s ease-in;
  &:focus {
    background: #fff;
    color: rgb(119, 44, 232);
    transition: all 0.1s ease-in;
    border-color: rgba(0, 0, 0, 0.4);
  }
  &::selection {
    color: #fff;
    background-color: rgb(119, 44, 232);
  }
}
</style>
