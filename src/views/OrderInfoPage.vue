<template>
  <BaseLoader v-if="isLoading"/>
  <main v-else class="content container">
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

      <h1 class="content__title">
        Заказ оформлен <span>№ {{orderInfo.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
            Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{orderInfo.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{orderInfo.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{orderInfo.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{orderInfo.email}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                {{orderInfo.paymentType}}
              </span>
            </li>
          </ul>
        </div>

        <div class="cart__block">

          <OrderList :orderList="orderList" :deliveryPrice="orderInfo.deliveryType.price" :totalPrice="orderInfo.totalPrice"/>

        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderList from '@/components/order/OrderList.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    OrderList,
    BaseLoader
  },
  computed: {
    ...mapGetters({ orderInfo: 'orderInfo', userAccessKey: 'userAccessKey' }),

    orderList () {
      return this.orderInfo.basket ? this.orderInfo.basket.items : {}
    }
  },
  watch: {
    '$route.params.id': {
      handler () {
        if (this.$store.state.orderInfo === this.$route.params.id) return

        this.isLoading = true
        this.$store.dispatch('doLoadOrderInfo', this.$route.params.id)
          .catch(() => { this.$router.push({ name: 'notFound' }) })
          .finally(() => { this.isLoading = false })
      },
      immediate: true
    }
  }
}
</script>

<style>

</style>
