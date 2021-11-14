<template>
  <label class="custom-file-upload">
    <input
      type="file"
      :name="id"
      class="input-file"
      @change="handleUpload"
      :value='modelValue'
      @input='updateValue'
      accept="image/png, image/jpeg"
    />
    <span class="file-selected">
      {{ messageToShow(modelValue) }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    id: String,
    modelValue: String
  },
  setup (props, { emit }) {
    const messageToShow = (modelValue) => {
      if (modelValue === '') {
        return 'Imagen del canal'
      }
      const fakeFilePath = modelValue
      const fileName = fakeFilePath.replace(/.*[/\\]/, '')
      const nameToShow = fileName.length < 15
        ? 'File: ' + fileName
        : 'File: ' + fileName.substring(0, 15) + '...'
      return nameToShow
    }

    const updateValue = (e) => {
      emit('update:modelValue', e.target.value)
    }

    return {
      messageToShow,
      updateValue
    }
  }
}
</script>

<style lang="scss" scoped>
input[type="file"] {
  display: none;
}
.custom-file-upload {
  border: none;
  border-radius: 0.4rem;
  padding: .7rem 1.2rem;
  outline: none;
  background-color: rgba(0, 0, 0, 0.05);
  transition: all 0.1s ease-in;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1)
  }
}

.file-selected {
  font-size: 1.3rem;
  font-weight: 600;
  color: rgb(14, 14, 16);
}
</style>
