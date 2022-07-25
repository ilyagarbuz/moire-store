<template>
  <ul class="cart__orders">
    <OrderItem v-for="orderItem in orderList" :orderItem="orderItem" :key="orderItem.id"/>
  </ul>

  <div class="cart__total">
    <p>Доставка: <b>{{fromatedDeliveryPrice}}</b></p>
    <p>Итого: <b>{{orderList.length}}</b> {{totalProducts}} на сумму <b>{{orderPrice}} ₽</b></p>
  </div>
</template>

<script>
import OrderItem from '@/components/order/OrderItem.vue'
import numberFormat from '@/helpers/numberFormat'
import { declOfNum } from '@/helpers/textFormat'

export default {
  props: ['orderList', 'deliveryPrice', 'totalPrice'],
  components: {
    OrderItem
  },
  computed: {
    fromatedDeliveryPrice () {
      return Number(this.deliveryPrice) === 0
        ? 'бесплатно'
        : numberFormat(this.deliveryPrice) + ' ₽'
    },
    totalProducts () {
      return this.orderList.length
        ? declOfNum(this.orderList.length, ['товар', 'товара', 'товаров'])
        : ''
    },
    orderPrice () {
      return numberFormat(this.totalPrice)
    }
  }
}
</script>

<style>

</style>
