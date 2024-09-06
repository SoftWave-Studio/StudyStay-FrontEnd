import { http } from '../../shared/config/http.config'

export class SecurityApiService {
  signIn(email, password) {
    return http.get(`/verificarusu/${email}/${password}`)
  }

  signUp(data) {
    return http.post('/usuario', data)
  }

  updateAccount(userId, data) {
    return http.put(`/usuario/${userId}`, data)
  }

  deleteAccount(userId) {
    return http.delete(`/user/${userId}`)
  }
}
