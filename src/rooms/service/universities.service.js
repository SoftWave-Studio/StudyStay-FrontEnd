import { http } from '../../shared/config/http.config'

export class UniversitiesApiService {

  getAllUniversities() {
    return http.get('/listaruniversities')
  }

}