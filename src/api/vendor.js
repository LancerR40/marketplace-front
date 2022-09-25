import axios from "axios";
import { VENDOR_SIGNUP } from './constant'

export const vendorSignupAPI = async (data) => {
  try {
    const request = await axios.post(VENDOR_SIGNUP, data)
    return request.data
  } catch (error) {
    return false
  }
}