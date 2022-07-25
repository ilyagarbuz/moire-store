<template>
  <BaseReload v-if="isDeleteFailed" @reload-data="$router.go()" :text="'Не удалось удалить товар'"/>
  <li v-else class="cart__item product" :class="{'is-delete': isDelete}">
    <div class="product__pic">
      <img :src="cartProduct.color.gallery[0].file.url" width="120" height="120" srcset="img/product-square-4@2x.jpg 2x" :alt="cartProduct.product.title">
    </div>
    <h3 class="product__title">
      {{cartProduct.product.title}}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{'background-color': cartProduct.color.color.code}"></i>
        {{colorTitle}}
      </span>
      <span>Размер: {{cartProduct.size.title}}</span>
    </p>
    <span class="product__code">
      Артикул: {{cartProduct.product.id}}
    </span>

    <CartCounter v-model.number="amount"/>

    <b class="product__price">
      {{price}} ₽
    </b>

    <button class="product__del button-del" @click="deleteProduct(cartProduct.id)" type="button" aria-label="Удалить товар из корзины">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { computed, ref, watch } from 'vue'
import numberFormat from '@/helpers/numberFormat'
import { firstUpperCase } from '@/helpers/textFormat'
import CartCounter from '@/components/cart/CartCounter.vue'
import BaseReload from '@/components/ui/BaseReload.vue'
import { useStore } from 'vuex'

export default {
  components: {
    CartCounter,
    BaseReload
  },
  props: ['cartProduct'],
  setup (props) {
    const amount = ref(props.cartProduct.quantity)
    const price = computed(() => {
      return numberFormat(props.cartProduct.price)
    })
    const colorTitle = computed(() => {
      return firstUpperCase(props.cartProduct.color.color.title)
    })

    // Put new amount
    const store = useStore()
    const updateCartProductAmount = (id, value) => {
      const response = store.dispatch('updateCartProductAmount', { basketItemId: id, quantity: value })
      response.then((res) => {
        if (res.statusText !== 'OK') amount.value = props.cartProduct.quantity
      })
    }

    // Delete a product from the cart
    const isDelete = ref(false)
    const isDeleteFailed = ref(false)
    const deleteProduct = async (basketItemId) => {
      isDelete.value = true
      const response = store.dispatch('deleteCartProduct', { basketItemId })
      response.then((res) => {
        if (res.statusText !== 'OK') isDeleteFailed.value = true
      })
    }

    // Watching amount and put new value
    watch(amount, (value) => {
      updateCartProductAmount(props.cartProduct.id, value)
    })

    return {
      amount,
      price,
      colorTitle,
      deleteProduct,
      isDelete,
      isDeleteFailed
    }
  }
}
</script>

<style>
  .is-delete {
    transition: all .2s ease;
    transform: translate(-105%, 0);
  }
</style>
