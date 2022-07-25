<template>
  <ul class="cart__list">
    <CartItem v-for="cartProduct in cartProducts" :cartProduct="cartProduct" :key="cartProduct.id"/>
  </ul>
</template>

<script>
import CartItem from '@/components/cart/CartItem.vue'

export default {
  props: ['cartProducts'],
  components: {
    CartItem
  }

}
</script>

<style>

</style>
