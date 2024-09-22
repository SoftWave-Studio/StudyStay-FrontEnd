import { http } from '../../shared/config/http.config'

export class SecurityApiService {
  signIn(email, password) {
    return http.get(`/verificarusu/${email}/${password}`)
  }

  selectUser(id) {
    return http.get(`/listarusuario/${id}`)
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
