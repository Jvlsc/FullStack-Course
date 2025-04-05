// Get User from Local Storage:
const getUser = () => {
  console.log('[User Service] Getting user from localStorage...')
  const userJSON = window.localStorage.getItem('login')
  if (userJSON) {
    const user = JSON.parse(userJSON)
    console.log('[User Service] User found:', user.username)
    return user
  }
  console.log('[User Service] No user found')
  return null
}

// Set User in Local Storage:
const setUser = (user) => {
  console.log('[User Service] Setting user in localStorage...')
  if (user === null) {
    console.log('[User Service] Removing user from localStorage')
    window.localStorage.removeItem('login')
  } else {
    console.log('[User Service] Saving user:', user.username)
    window.localStorage.setItem('login', JSON.stringify(user))
  }
  return user
}

// Export User Service:
export default { getUser, setUser }
