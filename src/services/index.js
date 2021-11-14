const baseUrl = 'https://twitchchat.herokuapp.com'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export {
  token,
  setToken,
  baseUrl
}
