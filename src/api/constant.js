let BASE_URL = null
const isLocalEnvironment = String(window.location.href).includes('localhost');

if (isLocalEnvironment) {
  BASE_URL = 'http://localhost:4000/api/v1';
} else {
  BASE_URL = 'https://marketplace-server-1.herokuapp.com/api/v1'
}

export const CHECK_AUTH    = `${BASE_URL}/auth`
export const VENDOR_LOGIN  = `${BASE_URL}/auth/vendor/login`
export const ADMIN_LOGIN   = `${BASE_URL}/auth/admin/login`
export const USER_DATA     = `${BASE_URL}/auth/data`

export const VENDOR_SIGNUP   = `${BASE_URL}/vendor/signup`
export const VENDOR_PRODUCTS = `${BASE_URL}/vendor/products`

export const GET_VENDORS            = `${BASE_URL}/admin/vendors`
export const PRODUCTS_BY_VENDOR_IDs = `${BASE_URL}/admin/products-by-vendors`

export const BUYER_GET_PRODUCTS = `${BASE_URL}/buyer/products`