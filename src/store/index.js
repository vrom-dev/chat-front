import Vuex from 'vuex'
import { getActiveUsers, loginWithGoogleToken } from '../services/user'
import { getAllChannels } from '../services/channel'
import { setToken } from '../services'

const store = new Vuex.Store({
  state: {
    user: null,
    channelsList: []
  },
  getters: {
  },
  actions: {
    async getUserFromGoogleToken () {
      const gtoken = JSON.parse(
        window.localStorage.getItem('chat:gtoken')
      )
      if (!gtoken) return
      const user = await loginWithGoogleToken(gtoken)
      if (user.token) {
        window.localStorage.setItem('chat:sessiontoken', JSON.stringify(user.token))
        store.commit('setUser', user)
      }
    },
    async getUserFromLocalStorage () {
      const user = JSON.parse(
        window.localStorage.getItem('chat:sessiontoken')
      )
      store.commit('setUser', user)
    },
    async getChannelsListFromAPI () {
      if (!store.state.user) return
      const { token } = store.state.user
      setToken(token)
      const channelsList = await getAllChannels()
      const activeUsers = await getActiveUsers()

      const newChannelList = channelsList.map(channel => {
        return {
          ...channel,
          activeUsers: activeUsers[channel.id] || []
        }
      })
      store.commit('setChannelsList', newChannelList)
    },
    updateActiveUsers (state, activeUsers) {
      const channelsList = store.state.channelsList
      const newChannelsList = channelsList.map(channel => {
        return {
          ...channel,
          activeUsers: activeUsers[channel.id] === undefined
            ? []
            : [...new Set(activeUsers[channel.id])]
        }
      })
      store.commit('setChannelsList', newChannelsList)
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setChannelsList (state, channelsList) {
      state.channelsList = channelsList
    },
    addChannel (state, newChannel) {
      state.channelsList.push(newChannel)
    }
  }
})

export default store
