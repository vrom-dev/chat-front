<template>
  <form
    @submit.prevent="handleSubmit"
    class='form'
    method="post"
  >
    <h2 class='title'>Iniciar sesión en Twitch</h2>
    <CustomInput
      id="username"
      placeholder="Nombre de usuario"
      v-model='username'
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
      <CustomButton buttonText="Iniciar sesión"/>
    </div>
  </form>
</template>

<script >
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import CustomInput from './CustomInput.vue'
import CustomButton from './CustomButton.vue'
import { loginUser } from '../services/user'

export default {
  components: { CustomInput, CustomButton },
  setup (props, context) {
    const store = useStore()
    const router = useRouter()

    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleSubmit = async (e) => {
      const usernameValue = username.value
      const passwordValue = password.value

      if (usernameValue === '' || passwordValue === '') {
        errorMessage.value = 'Debes introducir todos los campos'
        return
      }

      const credentials = {
        username: usernameValue,
        password: passwordValue
      }
      try {
        const response = await loginUser(credentials)
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
        if (error.message === 'Invalid username or password') {
          errorMessage.value = 'El email o contraseña son incorrectos'
          return
        }
        errorMessage.value = 'Ha ocurrido un error'
        username.value = ''
        password.value = ''
      }
    }

    return {
      handleSubmit,
      username,
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
  padding: 0 5rem;
}
.error-message {
  color: rgb(255, 0, 0);
  margin-bottom: 2rem;
  height: 2rem;
  font-size: 1.1rem;
}
</style>
