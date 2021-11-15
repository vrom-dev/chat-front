const baseUrl = import.meta.env.VITE_API_URL

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export {
  token,
  setToken,
  baseUrl
}
