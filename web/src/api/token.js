import decodeJWT from 'jwt-decode'

const key = 'userToken'

export function rememberToken(token) {
  if (token) {
    // remeber token
    localStorage.setItem(key, token)
  }
  else {
    // Clear the token from memory
    localStorage.removeItem(key)
  }
}

export function getValidToken() {
  const token = localStorage.getItem(key)
  try {
    const decodedToken = decodeJWT(token)
    // valid token
    const now = Date.now() / 1000
    // check if expired
    if (now > decodedToken.exp) {
      return null
    }
    // valid token
    return token
  }
  catch(error) {
    // invalid token
    return null
  }
}

export function getDecodedToken() {
  const validToken = getValidToken()
  if (validToken) {
    return decodeJWT(validToken)
  }
  else {
    return null
  }
}