<template>
  <form
    @submit.prevent="handleSubmit"
    class='form'
    method="post"
  >
    <h2 class='title'>Únete a Twitch hoy</h2>
    <CustomInput
      id="username"
      placeholder="Nombre de usuario"
      v-model='username'
    />
    <CustomInput
      id="email"
      type="email"
      placeholder="Dirección de email"
      v-model='email'
    />
    <CustomInput
      id="password"
      type="password"
      placeholder="Password"
      v-model='password'
    />
    <div class='error-message'>
      {{ errorMessage }}
    </div>
    <div class='button-container'>
      <CustomButton buttonText="Registrarse"/>
    </div>
  </form>
</template>

<script >
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { createUser } from '../services/user'

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
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleSubmit = async (e) => {
      const usernameValue = username.value.trim()
      const emailValue = email.value.trim().toLowerCase()
      const passwordValue = password.value.trim()
      const user = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue
      }

      if (usernameValue === '' || emailValue === '' || passwordValue === '') {
        errorMessage.value = 'Debes introducir todos los campos'
        return
      }

      try {
        const response = await createUser(user)
        if (response.error) {
          throw new Error(response.error)
        }
        store.commit('setUser', response)
        window.localStorage.setItem('chat:sessiontoken', JSON.stringify(response))
        router.push('/explore')
      } catch (error) {
        if (error.message === 'Required request field not provided') {
          errorMessage.value = 'Debes introducir todos los campos'
          return
        }
        if (error.message.startsWith('User validation failed')) {
          errorMessage.value = 'El nombre de usuario debe tener al menos 4 carácteres'
          return
        }
        errorMessage.value = 'Ha ocurrido un error'
        username.value = ''
        email.value = ''
        password.value = ''
      }
    }

    return {
      handleSubmit,
      username,
      email,
      password,
      errorMessage
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
.error-message {
  color: rgb(255, 0, 0);
  margin-bottom: 2rem;
  height: 2rem;
  font-size: 1.1rem;
}
</style>
