<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="submitOrder">
        <div class="cart__field">
          <div class="cart__data">

            <BaseFromField :title="'ФИО'" :error="formErrors.name">
              <input class="form__input" type="text" name="name" placeholder="Введите ваше полное имя" v-model="formData.name">
            </BaseFromField>

            <BaseFromField :title="'Адрес доставки'" :error="formErrors.address">
              <input class="form__input" type="text" name="address" placeholder="Введите ваш адрес" v-model="formData.address">
            </BaseFromField>

            <BaseFromField :title="'Телефон'" :error="formErrors.phone">
              <input class="form__input" type="tel" name="phone" placeholder="Введите ваш телефон" v-model="formData.phone">
            </BaseFromField>

            <BaseFromField :title="'Email'" :error="formErrors.email">
              <input class="form__input" type="email" name="email" placeholder="Введи ваш Email" v-model="formData.email">
            </BaseFromField>

            <BaseFromField :title="'Комментарий к заказу'" :error="formErrors.comment">
              <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания" v-model="formData.comment"></textarea>
            </BaseFromField>

          </div>

          <OrderOptions v-model:delivery="deliveryId" v-model:payment="paymentId" v-model:deliveryPrice="deliveryPrice"/>

        </div>

        <div class="cart__block">

          <OrderList :orderList="orderList" :deliveryPrice="deliveryPrice" :totalPrice="totalPrice"/>

          <button class="cart__button button button--primery" :disabled="orderAdding" type="submit">
            <BaseSpinner v-if="orderAdding" />
            <span :class="{'hidden': orderAdding}">Оформить заказ</span>
          </button>
        </div>
        <div v-if="formErrorMessage" class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{formErrorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import OrderList from '@/components/order/OrderList.vue'
import OrderOptions from '@/components/order/OrderOptions.vue'
import BaseFromField from '@/components/base/BaseFormField.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { useRouter } from 'vue-router'

export default {
  components: {
    OrderList,
    OrderOptions,
    BaseFromField,
    BaseSpinner
  },
  setup () {
    // Use
    const store = useStore()
    const router = useRouter()

    // Get a list of order
    const orderList = computed(() => {
      return store.getters.cartProducts
    })

    // Get and formating the total price
    const totalPrice = computed(() => {
      return store.getters.cartTotalPrice
    })

    // Delivery and payment
    const deliveryId = ref(1)
    const paymentId = ref(1)
    const deliveryPrice = ref(0)

    // Form data and errors
    const formData = ref({})
    const formErrors = ref({})
    const formErrorMessage = ref('')

    // Submit
    const userAccessKey = computed(() => {
      return store.getters.userAccessKey
    })
    const orderAdding = ref(false)

    const submitOrder = async () => {
      orderAdding.value = true
      formErrors.value = {}
      formErrorMessage.value = ''

      const data = {
        ...formData.value,
        deliveryTypeId: deliveryId.value,
        paymentTypeId: paymentId.value
      }

      try {
        const response = await axios.post(
          API_BASE_URL + '/api/orders',
          { ...data },
          {
            params: {
              userAccessKey: userAccessKey.value
            }
          }
        )
        if (response.statusText !== 'OK') throw new Error()
        store.commit('updateOrderInfo', response.data)
        store.commit('restCart')
        router.push({ name: 'order-info', params: { id: response.data.id } })
      } catch (error) {
        formErrors.value = error.response.data.error.request || {}
        formErrorMessage.value = error.response.data.error.message
      } finally {
        orderAdding.value = false
      }
    }

    return {
      orderList,
      totalPrice,
      deliveryId,
      paymentId,
      deliveryPrice,
      formData,
      formErrors,
      formErrorMessage,
      submitOrder,
      orderAdding
    }
  }
}
</script>

<style scoped>
  .cart__button {
    position: relative;
  }
  .hidden {
    opacity: 0;
  }
</style>
