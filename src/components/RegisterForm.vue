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

    const handleSubmit = async (e) => {
      const usernameValue = username.value.trim()
      const emailValue = email.value.trim().toLowerCase()
      const passwordValue = password.value.trim()
      const user = {
        username: usernameValue,
        email: emailValue,
        password: passwordValue
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
        console.log(error)
        username.value = ''
        email.value = ''
        password.value = ''
      }
    }

    return {
      handleSubmit,
      username,
      email,
      password
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
