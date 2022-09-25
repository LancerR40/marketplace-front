import axios from "axios";
import { GET_VENDORS, PRODUCTS_BY_VENDOR_IDs } from './constant'

export const vendorsAPI = async () => {
  const token = localStorage.getItem('token') || ''
  try {
    const request = await axios.get(GET_VENDORS, {
        headers: {
            'x-auth-token': token
        }
    })
    return request.data
  } catch (error) {
    return false
  }
}

export const productByVendorIdsAPI = async (data) => {
  const token = localStorage.getItem('token') || ''
  try {
    const request = await axios.post(PRODUCTS_BY_VENDOR_IDs, data, {
        headers: {
            'x-auth-token': token
        }
    })
    return request.data
  } catch (error) {
    return false
  }
}