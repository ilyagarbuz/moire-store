<template>
  <ul v-if="products.length" class="catalog__list">
    <ProductItem v-for="product in products" :product="product" :key="product.id"/>
  </ul>
  <p v-else>Товары не найдены. Попробуйте изменить мараметры филтра.</p>
</template>

<script>
import ProductItem from '@/components/product/ProductItem.vue'

export default {
  props: ['products'],
  components: {
    ProductItem
  }
}
</script>

<style>

</style>>
