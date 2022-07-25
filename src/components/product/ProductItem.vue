<template>
    <li class="catalog__item">
      <router-link class="catalog__pic" :to="{name: 'product', params:{id: product.id}}">
        <img :src="currentImage" :alt="product.title">
      </router-link>

      <h3 class="catalog__title">
        <a href="#">
          {{product.title}}
        </a>
      </h3>

      <span class="catalog__price">
        {{price}} ₽
      </span>

      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors" :key="color.id">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="selectedColor">
            <span class="colors__value" :style="{'background-color': color.color.code}">
            </span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat'
import { computed, ref } from 'vue'
export default {
  props: ['product'],
  setup (props) {
    const selectedColor = ref(props.product.colors[0].id)
    const currentImage = computed(() => {
      return props.product.colors.find(color => color.id === selectedColor.value).gallery[0].file.url
    })
    const price = computed(() => {
      return numberFormat(props.product.price)
    })

    return {
      price,
      selectedColor,
      currentImage
    }
  }

}
</script>

<style>

</style>>
