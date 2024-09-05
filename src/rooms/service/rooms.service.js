import { http } from '../../shared/config/http.config'

export class RoomsApiService {
  getAllPosts() {
    return http.get('/post')
  }

  getPostById(id) {
    return http.get(`/post/${id}`)
  }

  createPost(data) {
    return http.post('/post', data)
  }

  deletePost(id) {
    return http.delete(`/post/${id}`)
  }

  getAllUniversities() {
    return http.get('/university')
  }

  createReservation(data) {
    return http.post('/reservation', data)
  }
}
