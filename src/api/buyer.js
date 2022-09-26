import axios from "axios";
import { BUYER_GET_PRODUCTS } from './constant'

export const productsByParamsAPI = async (params) => {
  try {
    const request = await axios.post(BUYER_GET_PRODUCTS, params)
    return request.data
  } catch (error) {
    return false
  }
}