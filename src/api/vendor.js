import axios from "axios";
import { VENDOR_SIGNUP, VENDOR_PRODUCTS } from './constant'

export const vendorSignupAPI = async (data) => {
  try {
    const request = await axios.post(VENDOR_SIGNUP, data)
    return request.data
  } catch (error) {
    return false
  }
}

export const productsAPI = async () => {
  const token = localStorage.getItem('token') || ''
  try {
    const request = await axios.get(VENDOR_PRODUCTS, {
      headers: {
        'x-auth-token': token
      }
    })
    return request.data
  } catch (error) {
    return false
  }
}

export const addProductsAPI = async (data) => {
  const token = localStorage.getItem('token') || ''
  try {
    const request = await axios.post(VENDOR_PRODUCTS, data, {
      headers: {
        'x-auth-token': token
      }
    })
    return request.data
  } catch (error) {
    return false
  }
}

