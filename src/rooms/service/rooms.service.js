import { http } from '../../shared/config/http.config'

export class RoomsApiService {
  getAllPosts() {
    return http.get('/listarposts')
  }

  getPostById(id) {
    return http.get(`/listarpost/${id}`)
  }

  createPost(data) {
    return http.post('/post', data)
  }

  deletePost(id) {
    return http.delete(`/post/${id}`)
  }

  getAllUniversities() {
    return http.get('/listaruniversities')
  }

  createReservation(data) {
   return http.post('/reservation', data)
  }
}
