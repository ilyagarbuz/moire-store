import { API_BASE_URL } from '@/config'
import axios from 'axios'

export default {
  state: {
    orderInfo: null
  },
  getters: {
    orderInfo (state) {
      return state.orderInfo ? state.orderInfo : {}
    }
  },
  mutations: {
    updateOrderInfo (state, data) {
      state.orderInfo = data
    }
  },
  actions: {
    doLoadOrderInfo (context, orderId) {
      return axios.get(API_BASE_URL + `/api/orders/${orderId}`,
        {
          params: {
            userAccessKey: context.getters.userAccessKey
          }
        }
      )
        .then((res) => {
          context.commit('updateOrderInfo', res.data)
        })
    }
  }
}
