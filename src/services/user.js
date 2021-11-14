import {
  token,
  setToken,
  baseUrl
} from './index'

const getActiveUsers = async () => {
  const activeUsers = await window.fetch(`${baseUrl}/user/active`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
  const activeUsersJson = await activeUsers.json()
  return activeUsersJson.data
}
const createUser = async (user) => {
  const response = await window.fetch(`${baseUrl}/user`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  const json = await response.json()
  return json
}

const renameUser = async (username, id) => {
  const response = await window.fetch(`${baseUrl}/user/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify({ username: username })
  })
  const json = await response.json()
  return json
}

const loginWithGoogleToken = async (token) => {
  const response = await window.fetch(`${baseUrl}/login/google`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token })
  })
  const json = await response.json()
  return json
}

const loginUser = async (credentials) => {
  const response = await window.fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  const json = await response.json()
  return json
}

export {
  setToken,
  getActiveUsers,
  createUser,
  renameUser,
  loginUser,
  loginWithGoogleToken
}
