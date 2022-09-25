import axios from "axios";
import { CHECK_AUTH, VENDOR_LOGIN, USER_DATA } from './constant'

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

export const vendorLoginAPI = async (data) => {
  try {
    const request = await axios.post(VENDOR_LOGIN, data)
    return request.data
  } catch (error) {
    return false
  } 
}