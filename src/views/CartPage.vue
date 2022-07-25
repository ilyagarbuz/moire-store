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
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{totalProducts}}
        </span>
      </div>
    </div>

    <section v-if="cartProducts.length" class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <CartProducts :cartProducts="cartProducts"/>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{cartTotalPrice}} ₽</span>
          </p>

          <router-link v-slot="{navigate}" :to="{name:'order'}" custom>
            <button @click="navigate" class="cart__button button button--primery">
              Оформить заказ
            </button>
          </router-link>
        </div>
      </form>
    </section>

    <div v-else class="empty-cart">
      <p>В коризне нет товаров.</p>
      <p>Вы можете выбрать, что-нибудь в каталоге.</p>
      <router-link v-slot="{navigate}" :to="{name:'main'}" custom>
        <button class="button button--primery" @click="navigate">Перейти в каталог</button>
      </router-link>
    </div>

  </main>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import numberFromat from '@/helpers/numberFormat'
import { declOfNum } from '@/helpers/textFormat'
import CartProducts from '@/components/cart/CartProducts.vue'

export default {
  components: {
    CartProducts
  },
  setup () {
    // Getting a list of items in the cart
    const store = useStore()
    const cartProducts = computed(() => {
      return store.getters.cartProducts
    })

    // Getting the total price of the cart
    const cartTotalPrice = computed(() => {
      return numberFromat(store.getters.cartTotalPrice)
    })

    // Formatting the total number of products
    const totalProducts = computed(() => {
      return cartProducts.value
        ? cartProducts.value.length + ' ' + declOfNum(cartProducts.value.length, ['товар', 'товара', 'товаров'])
        : 0
    })

    return {
      cartProducts,
      cartTotalPrice,
      totalProducts
    }
  }
}
</script>

<style>

</style>
