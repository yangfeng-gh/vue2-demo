import qs from 'qs'
import http from './http'
export {default} from './http'
export * from './http'

export const login = (data) => http.post('/api/login', data)
export const logout = () => http.post('/api/logout')
