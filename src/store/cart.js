import axios from 'axios'
import { API_BASE_URL } from '@/config'

export default {
  state: {

    cartData: null,
    userAccessKey: null

  },
  getters: {
    cartProducts (state) {
      return state.cartData
        ? state.cartData.items.map(item => {
          return {
            ...item,
            color: {
              ...item.color,
              gallery: item.color.gallery ? item.color.gallery : [{ file: { url: 'img/no-image.png' } }]
            }
          }
        })
        : []
    },

    cartTotalPrice (state, getters) {
      return getters.cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
    },

    userAccessKey (state) {
      return state.userAccessKey
    }

  },
  mutations: {

    updateCartData (state, data) {
      state.cartData = data
    },

    updateUserAccessKey (state, key) {
      state.userAccessKey = key
      localStorage.setItem('userAccessKey', key)
    },

    restCart (state) {
      state.cartData = null
    }

  },
  actions: {

    async doLoadCartData (context) {
      try {
        const response = await axios.get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        if (response.statusText !== 'OK') throw new Error()
        if (!context.userAccessKey) context.commit('updateUserAccessKey', response.data.user.accessKey)
        context.commit('updateCartData', response.data)
      } catch (error) {
        console.log(error)
      }
    },

    async addProductToCart (context, { productId, colorId, sizeId, quantity }) {
      const response = await axios.post(API_BASE_URL + '/api/baskets/products', {
        productId,
        colorId,
        sizeId,
        quantity
      },
      {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })

      if (response.statusText === 'OK') {
        context.commit('updateCartData', response.data)
      }

      return response
    },

    async updateCartProductAmount (context, { basketItemId, quantity }) {
      try {
        const response = await axios.put(API_BASE_URL + '/api/baskets/products', {
          basketItemId,
          quantity
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        if (response.statusText !== 'OK') throw new Error()
        context.commit('updateCartData', response.data)
        return response
      } catch (error) {
        return error.response
      }
    },

    async deleteCartProduct (context, { basketItemId }) {
      try {
        const response = await axios.delete(API_BASE_URL + '/api/baskets/products', {
          data: {
            basketItemId
          },
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
        if (response.statusText !== 'OK') throw new Error()
        context.commit('updateCartData', response.data)
        return response
      } catch (error) {
        return error.response
      }
    }

  }

}
