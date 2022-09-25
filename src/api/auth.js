import axios from "axios";
import { CHECK_AUTH, USER_DATA } from './constant'

export const checkAuthAPI = async () => {
  const token = localStorage.getItem('token') || ''

  try {
    const request = await axios.get(CHECK_AUTH, {
      headers: { 'x-auth-token': token }
    })
    return request.data
  } catch (error) {
    return false
  }
}

export const userDataAPI = async () => {
  const token = localStorage.getItem('token') || ''

  try {
    const request = await axios.get(USER_DATA, {
      headers: { 'x-auth-token': token }
    })
    return request.data
  } catch (error) {
    return false
  }  
}