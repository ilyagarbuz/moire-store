<template>
  <div class="cart__options">
    <h3 class="cart__title">Доставка</h3>
    <ul class="cart__options options">
      <li class="options__item" v-for="delivery in deliveries" :key="delivery.id">
        <label class="options__label">
          <input class="options__radio sr-only" type="radio" :value="delivery.id" v-model="selectedDelivery">
          <span class="options__value">
            {{delivery.title}} <b>{{delivery.price}} ₽</b>
          </span>
        </label>
      </li>
    </ul>

    <h3 class="cart__title">Оплата</h3>
    <ul class="cart__options options">
      <li class="options__item" v-for="payment in payments" :key="payment.id">
        <label class="options__label">
          <input class="options__radio sr-only" type="radio"  :value="payment.id" v-model="selectedPayment">
          <span class="options__value">
            {{payment.title}}
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { API_BASE_URL } from '@/config'
import axios from 'axios'
export default {
  props: ['delivery', 'payment', 'deliveryPrice'],
  setup (props, { emit }) {
    // Load deliveries and payments
    const selectedDelivery = ref(props.delivery)
    const deliveries = ref([])
    const doLoadDeliveries = async () => {
      const response = await axios.get(API_BASE_URL + '/api/deliveries')
      deliveries.value = response.data
      doLoadPayments()
    }

    const price = computed(() => {
      return deliveries.value.find(d => d.id === selectedDelivery.value).price
    })

    const selectedPayment = ref(props.payment)
    const payments = ref([])
    const doLoadPayments = async () => {
      const response = await axios.get(API_BASE_URL + `/api/payments?deliveryTypeId=${selectedDelivery.value}`)
      payments.value = response.data
      selectedPayment.value = payments.value[0].id
      emit('update:delivery', selectedDelivery.value)
      emit('update:payment', selectedPayment.value)
      emit('update:deliveryPrice', price.value)
    }

    // Hooks
    onMounted(() => {
      doLoadDeliveries()
    })

    watch(selectedDelivery, () => {
      doLoadPayments()
      emit('update:delivetyPrice', price.value)
    })

    watch(selectedPayment, () => {
      emit('update:payment', selectedPayment.value)
    })

    return {
      deliveries,
      payments,
      selectedDelivery,
      selectedPayment,
      price
    }
  }
}
</script>

<style>

</style>
