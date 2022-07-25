<template>
    <router-link class="header__cart" :to="{name: 'cart'}" aria-label="Корзина с товарами">
      <svg width="19" height="24">
        <use xlink:href="#icon-cart"></use>
      </svg>
      <span class="header__count" aria-label="Количество товаров">{{countCartProducts}}</span>
    </router-link>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  setup () {
    const store = useStore()
    const countCartProducts = computed(() => {
      return store.getters.cartProducts.length
    })
    return {
      countCartProducts
    }
  }
}
</script>

<style>

</style>
