import { useState, useEffect, createContext, useContext } from 'react'
import { checkAuthAPI, userDataAPI } from '../api/auth'

const defaultState = { auth: false, role: null, name: null }

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(defaultState)

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    userData()
  }, [userAuth.auth])

  const checkAuth = async () => {
    const response = await checkAuthAPI()

    if (!response) {
      return
    }

    if (response.success) {
      const { auth, role } = response.data
      setUserAuth((state) => ({ ...state, auth, role }))
    }
  }

  const userData = async () => {
    if (!userAuth.auth) {
      return
    }

    const response = await userDataAPI()

    if (!response || !response.success) {
      return setUserAuth(defaultState)
    }

    if (response.success) {
      const { name } = response.data
      setUserAuth((state) => ({ ...state, name }))
    }
  }

  const value = {
    userAuth,
    setUserAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)