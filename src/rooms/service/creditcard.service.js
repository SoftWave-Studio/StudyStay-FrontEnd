import { http } from '../../shared/config/http.config'

export class CreditcardServiceApiService {
    getAllCardsUser(userid) {
        return http.get(`/listarcreditcards/${userid}`)
    }

    createCreditcard(data) {
        return http.post('/creditcard/', data)
    }

    deleteCreditcard(id) {
        return http.delete(`/creditcard/${id}`)
    }

    putCreditCardId(id, data){
        return http.put(`/creditcard/${id}`, data)
    }

}