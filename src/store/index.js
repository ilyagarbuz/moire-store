import { createStore } from 'vuex'
import cart from '@/store/cart'
import order from '@/store/order'

export default createStore({
  modules: {
    cart,
    order
  }
})
