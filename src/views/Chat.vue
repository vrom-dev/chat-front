<template>
  <div class="home-container">
    <AppHeader
      titleText="Chat del stream"
      :toggle="toggleActiveUsersList"
      showChat
      showLogout
    />
    <ListOfMessages
      :messages="messages"
      :channelName="channelName"
      v-if="showActiveUsers"
    />
    <ListOfActiveUsers
      v-else
    />
    <form class="form-container" @submit.prevent="handleSubmit">
      <ChatInput v-model="message" @submit:modelValue="handleSubmit" />
      <div class="button-container">
        <OptionsButton>
          <router-link to="/explore">
            <svg
              type="color-fill-current"
              width="100%"
              height="100%"
              version="1.1"
              viewBox="0 0 20 20"
              x="0px"
              y="0px"
              class="ScSvg-sc-1j5mt50-1 kMNUwy"
            >
              <g>
                <path
                  fill-rule="evenodd"
                  d="M12.002 3.999a2 2 0 012 2v2L18 6v8l-3.998-2v2a2 2 0 01-2 1.999h-8a2 2 0 01-2-2V6a2 2 0 012-2h8zM12 6H4v8h8V6z"
                  clip-rule="evenodd"
                ></path>
              </g>
            </svg>
          </router-link>
        </OptionsButton>
        <CustomButton buttonText="Chat" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { io } from 'socket.io-client'

import AppHeader from '../components/AppHeader.vue'
import ListOfMessages from '../components/ListOfMessages.vue'
import ListOfActiveUsers from '../components/ListOfActiveUsers.vue'
import CustomButton from '../components/CustomButton.vue'
import ChatInput from '../components/ChatInput.vue'
import OptionsButton from '../components/OptionsButton.vue'

export default {
  components: {
    AppHeader,
    ListOfMessages,
    ListOfActiveUsers,
    CustomButton,
    ChatInput,
    OptionsButton
  },
  setup (props, context) {
    const route = useRoute()
    const store = useStore()

    const channelName = ref('')
    const showActiveUsers = ref(true)

    ;(async () => {
      channelName.value = store.state.channelsList
        .find(channel => channel.id === route.params.id)
        .name
    })()

    const socket = io(`${import.meta.env.VITE_API_URL}`)
    const messages = ref([])
    const message = ref('')

    socket.emit('user joins channel', {
      channel: route.params.id,
      username: store.state.user.username
    })

    socket.on('new message', ({ payload }) => {
      messages.value.push(payload)
    })

    const handleSubmit = async (e) => {
      const content = message.value
      const { userColor, username, token } = store.state.user
      const messageObj = {
        content,
        userColor,
        username
      }
      messages.value.push(messageObj)
      message.value = ''
      const newMessage = await window.fetch(
        `${import.meta.env.VITE_API_URL}/room/${route.params.id}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            content
          })
        }
      )
      await newMessage.json()
      socket.emit('user sends message', {
        ...messageObj,
        channel: route.params.id
      })
    }

    socket.on('active users', (activeUsers) => {
      const channels = store.state.channelsList.map(channel => {
        return {
          ...channel,
          activeUsers: activeUsers[channel.id] === undefined
            ? []
            : [...new Set(activeUsers[channel.id])]
        }
      })
      store.commit('setChannelsList', channels)
    })

    const toggleActiveUsersList = () => {
      showActiveUsers.value = !showActiveUsers.value
    }

    onUnmounted(() => {
      socket.close()
    })

    return {
      handleSubmit,
      messages,
      message,
      channelName,
      toggleActiveUsersList,
      showActiveUsers,
      getChannelsList: () => store.dispatch('getChannelsList')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
.form-container {
  margin: 1.5rem;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  position: relative;
}
</style>
