<template>
  <form
    method="post"
    @submit.prevent="handleSubmit"
    enctype="multipart/form-data"
  >
    <CustomInput
      labelText="Nombre del canal"
      placeholder="Introduce el nombre del canal"
      type="text"
      id="name"
      v-model="channelName"
    />
    <div class="buttons-container">
      <CustomInputFile
        id="img"
        v-model="channelImage"
      />
      <CustomButton buttonText="Añadir canal" />
    </div>
    <div class='error-message'>
      {{ errorMessage }}
    </div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

import CustomButton from '../components/CustomButton.vue'
import CustomInput from '../components/CustomInput.vue'
import CustomInputFile from '../components/CustomInputFile.vue'

export default {
  components: {
    CustomButton,
    CustomInput,
    CustomInputFile
  },
  setup (props, { emit }) {
    const store = useStore()
    const channelName = ref('')
    const channelImage = ref('')
    const errorMessage = ref('')

    const handleSubmit = async (e) => {
      if (channelName.value.trim() === '' || channelImage.value.trim() === '') {
        errorMessage.value = 'Debes introducir todos los campos'
        return
      }
      const data = new window.FormData(e.target)
      data.append('user', store.state.user.username)
      const { token } = store.state.user
      try {
        const response = await window.fetch(`${import.meta.env.VITE_API_URL}/room`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: data
        })
        const json = await response.json()
        if (json.error) {
          throw new Error(json.error)
        }
        const { id, image, name } = json
        store.commit('addChannel', {
          id,
          image,
          name,
          activeUsers: []
        })
        channelName.value = ''
        channelImage.value = ''
        errorMessage.value = ''
      } catch (error) {
        if (error.message === 'Required request field not provided') {
          errorMessage.value = 'Debes introducir todos los campos'
          return
        }
        if (error.message  === 'File type not supported') {
          errorMessage.value = 'El archivo debe ser png, jpeg o gif'
          return
        }
        channelName.value = ''
        channelImage.value = ''
      }
    }

    return {
      channelName,
      channelImage,
      handleSubmit,
      errorMessage
    }
  }
}
</script>

<style lang="scss" scoped>

.buttons-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.error-message {
  color: rgb(255, 0, 0);
  margin: 2rem .5rem;
  height: 2rem;
  font-size: 1.1rem;
}
</style>
