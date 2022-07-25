<template>
  <BaseLoader v-if="isLoading"/>
  <BaseReload v-else-if="isLoadFailed" @reload-data="doLoadProduct" :text="'Не удалось загрузить данные о товаре :('"/>
  <main v-else class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main-category', params:{id: product.category.id}}">
            {{product.category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="currentImage" :alt="product.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="color in product.colors" :key="color.id">
            <a href="#" class="pics__link" @click.prevent="doSelectImage(color.id)" :class="{'pics__link--current': color.id === selectedColor}">
              <img width="98" height="98" :src="color.gallery[0].file.url" :alt="product.title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="doAddProductToCart(product.id, curretColor, currentSize, quantity)">
            <div class="item__row item__row--center">

              <CartCounter v-model.number="quantity"/>

              <b class="item__price">
                {{price}} ₽
              </b>
            </div>

            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in product.colors" :key="color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="selectedColor" >
                      <span class="colors__value" :style="{'background-color': color.color.code}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" v-model="currentSize">
                    <option v-for="size in product.sizes" :key="size.id" :value="size.id">{{size.title}}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button ref="addButton" class="item__button button button--primery" :disabled="isAddingToCart" :style="{'position': 'relative'}" type="submit">
              <BaseSpinner v-if="isAddingToCart" />
              <span :class="{'hidden': isAddingToCart}">В корзину</span>
            </button>
            <div v-if="isAddedToCart" :style="{'color': 'green', 'margin-top': '10px'}">Товар добавлен в корзину</div>
            <div v-if="isAddingFailed" :style="{'color': 'red', 'margin-top': '10px'}">Не удалось добавть товар в корзину</div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link" :class="{'tabs__link--current': currentTabComponent === 'ProductInfo'}" href="#" @click.prevent="doTabChange('ProductInfo')">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#" :class="{'tabs__link--current': currentTabComponent === 'ProductDelivery'}" @click.prevent="doTabChange('ProductDelivery')">
              Доставка и возврат
            </a>
          </li>
        </ul>
        <keep-alive>
          <component :is="currentTabComponent" :product-content="product.content"></component>
        </keep-alive>
      </div>
    </section>
  </main>
</template>

<script>
import axios from 'axios'
import { computed, ref } from 'vue'
import { API_BASE_URL } from '@/config'
import { useRoute, useRouter } from 'vue-router'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseReload from '@/components/ui/BaseReload.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import numberFormat from '@/helpers/numberFormat'
import ProductInfo from '@/components/product/ProductInfo.vue'
import ProductDelivery from '@/components/product/ProductDelivery.vue'
import CartCounter from '@/components/cart/CartCounter.vue'
import { useStore } from 'vuex'

export default {
  components: {
    BaseLoader,
    BaseReload,
    BaseSpinner,
    ProductInfo,
    ProductDelivery,
    CartCounter
  },
  setup () {
    const route = useRoute()
    const router = useRouter()

    // Load product data
    const productData = ref(null)
    const isLoading = ref(false)
    const isLoadFailed = ref(false)
    const product = computed(() => {
      return productData.value
        ? {
            ...productData.value.data,
            colors: productData.value.data.colors.map(color => {
              return {
                ...color,
                gallery: color.gallery ? color.gallery : [{ file: { url: '/img/no-image.png' } }]
              }
            })
          }
        : {}
    })

    const doLoadProduct = async () => {
      isLoadFailed.value = false
      isLoading.value = true

      try {
        productData.value = await axios.get(API_BASE_URL + `/api/products/${route.params.id}`)
        if (productData.value.statusText !== 'OK') throw new Error()

        selectedColor.value = productData.value.data.colors[0].id
        currentSize.value = product.value.sizes[0].id
      } catch (error) {
        error.response.data.error.code === 404 ? router.push({ name: 'notFound' }) : isLoadFailed.value = true
      } finally {
        isLoading.value = false
      }
    }
    doLoadProduct()

    // Add Product to Cart
    const store = useStore()
    const quantity = ref(1)
    const addButton = ref(null)
    const isAddingToCart = ref(false)
    const isAddedToCart = ref(false)
    const isAddingFailed = ref(false)
    const doAddProductToCart = async (productId, colorId, sizeId, quantity) => {
      addButton.value.blur()
      isAddingToCart.value = true
      isAddingFailed.value = false
      isAddedToCart.value = false
      try {
        const response = await store.dispatch('addProductToCart', { productId, colorId, sizeId, quantity })
        if (response.statusText !== 'OK') throw new Error()
        isAddedToCart.value = true
      } catch (error) {
        isAddingFailed.value = true
        console.log(error)
      } finally {
        isAddingToCart.value = false
      }
    }

    // Format price
    const price = computed(() => {
      return numberFormat(product.value.price)
    })

    // Colors, Images, Sizes
    const selectedColor = ref(0)
    const currentSize = ref(0)
    const curretColor = computed(() => {
      return product.value.colors.find(color => color.id === selectedColor.value).color.id
    })
    const currentImage = computed(() => {
      return product.value.colors.find(color => color.id === selectedColor.value).gallery[0].file.url
    })

    const doSelectImage = (id) => {
      selectedColor.value = id
    }

    // Info-Delivery Tabs
    const currentTabComponent = ref('ProductInfo')

    const doTabChange = (component) => {
      currentTabComponent.value = component
    }

    return {
      doLoadProduct,
      isLoading,
      isLoadFailed,
      productData,
      product,
      price,
      selectedColor,
      curretColor,
      currentImage,
      currentSize,
      doSelectImage,
      currentTabComponent,
      doTabChange,
      doAddProductToCart,
      quantity,
      addButton,
      isAddingToCart,
      isAddingFailed,
      isAddedToCart

    }
  }
}
</script>

<style scoped>
  .hidden {
    visibility: hidden;
  }
</style>
