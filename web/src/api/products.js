import api, { setToken } from './init'
import { getDecodedToken } from "./token";

export function listProducts() {
  return api.get('/products')
  .then((res) => res.data)
}

export function createProduct(data) {
  return api.post('/products', data)
  .then((res) => res.data)
}

export function updateProduct(data) {
  return api.put('/products/:id', data)
  .then((res) => res.data)
}
