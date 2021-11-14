import {
  token,
  setToken,
  baseUrl
} from './index'

const getAllChannels = async () => {
  const channels = await fetch(`${baseUrl}/room`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
  const channelsJson = await channels.json()
  return channelsJson.data
}

const getChannel = async (channelId) => {
  const data = await window.fetch(
    `${baseUrl}/room/${channelId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }
  )
  const channel = await data.json()
  return channel
}

export {
  setToken,
  getAllChannels,
  getChannel
}
