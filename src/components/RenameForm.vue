<template>
  <form
    @submit.prevent="handleSubmit"
    class='form'
    method="post"
  >
    <h2 class='title'>Especifica tu nombre de usuario</h2>
    <CustomInput
      id="username"
      placeholder="Nombre de usuario"
      v-model='username'
    />
    <div class='button-container'>
      <CustomButton buttonText="Guardar"/>
    </div>
  </form>
</template>

<script >
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { renameUser } from '../services/user'
import { setToken } from '../services'

import CustomInput from './CustomInput.vue'
import CustomButton from './CustomButton.vue'
export default {
  components: {
    CustomInput,
    CustomButton
  },
  setup (props, context) {
    const store = useStore()
    const router = useRouter()

    const username = ref('')

    const handleSubmit = async (e) => {
      const usernameValue = username.value.trim()
      try {
        setToken(store.state.user.token)
        const response = await renameUser(usernameValue, store.state.user.id)
        if (response.error) {
          throw new Error(response.error)
        }
        store.commit('setUser', response)
        window.localStorage.setItem('chat:sessiontoken', JSON.stringify(response))
        router.push('/explore')
      } catch (error) {
        console.log(error)
        username.value = ''
      }
    }

    return {
      handleSubmit,
      username
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  color: rgb(119, 44, 232);
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}
.button-container {
  display: flex;
  justify-content: center;
}
.form {
  width: 100%;
  padding: 0 5rem 0;
}
</style>
