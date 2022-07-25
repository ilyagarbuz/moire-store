<template>
  <li class="cart__order">
    <h3>{{orderItem.product.title}}</h3>
    <b>{{price}} ₽</b>
    <span>Артикул: {{orderItem.product.id}}</span>
  </li>
</template>

<script>
import { computed } from 'vue'
import numberFormat from '@/helpers/numberFormat'

export default {
  props: ['orderItem'],
  setup (props) {
    // Order product price formatting
    const price = computed(() => {
      return numberFormat(props.orderItem.price * props.orderItem.quantity)
    })

    return {
      price
    }
  }

}
</script>

<style>

</style>
