<template>
  <main class="content container">
    <div class="content__top">

      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info">
          {{totalProducts}}
        </span>
      </div>

    </div>

    <div class="content__catalog">
      <ProductFilter
      v-model:price-from="filterPriceFrom"
      v-model:price-to="filterPiceTo"
      v-model:category-value="filterCategory"
      v-model:materials-value="filterMaterials"
      v-model:seasons-value="filterSeasons"
      v-model:page="page"
      />

      <BaseLoader v-if="isLoading"/>
      <BaseReload v-else-if="isLoadFailed" @reload-data="doLoadProducts" :text="'Не удалось загрузить товары :('"/>

      <section v-else class="catalog">
        <ProductList :products="products"/>

        <BasePagination v-model:page="page" :pages="pages"/>

      </section>
    </div>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { declOfNum } from '@/helpers/textFormat'
import ProductList from '@/components/product/ProductList.vue'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseReload from '@/components/ui/BaseReload.vue'
import BasePagination from '@/components/base/BasePagination.vue'
import ProductFilter from '@/components/product/ProductFilter.vue'

export default {
  components: {
    ProductList,
    BaseLoader,
    BaseReload,
    BasePagination,
    ProductFilter
  },
  setup () {
    // Pagination params ====================
    const page = ref(1)
    const itemsOnPage = ref(12)
    const pages = computed(() => {
      return productsData.value.pagination.pages
    })
    const route = useRoute()

    // Filter params ====================
    const filterPriceFrom = ref(0)
    const filterPiceTo = ref(0)
    const filterCategory = ref(route.params.id ? route.params.id : 0)
    const filterMaterials = ref([])
    const filterSeasons = ref([])

    // Loading product data ====================
    const productsData = ref(null)
    const products = computed(() => {
      return productsData.value
        ? productsData.value.items.map(item => {
          return {
            ...item,
            colors: item.colors.map(color => {
              return {
                ...color,
                gallery: color.gallery ? color.gallery : [{ file: { url: 'img/no-image.png' } }]
              }
            })
          }
        })
        : []
    })
    const isLoading = ref(false)
    const isLoadFailed = ref(false)

    const doLoadProducts = async () => {
      isLoadFailed.value = false
      isLoading.value = true
      try {
        const response = await axios.get(API_BASE_URL + '/api/products', {
          params: {
            page: page.value,
            limit: itemsOnPage.value,
            minPrice: filterPriceFrom.value,
            maxPrice: filterPiceTo.value,
            categoryId: filterCategory.value,
            materialIds: filterMaterials.value,
            seasonIds: filterSeasons.value
          }
        })
        productsData.value = response.data
        if (!response.statusText === 'OK') throw Error('Bad response')
      } catch (error) {
        isLoadFailed.value = true
      } finally {
        isLoading.value = false
      }
    }

    // Formatting the total number of products
    const totalProducts = computed(() => {
      return productsData.value
        ? productsData.value.pagination.total + ' ' + declOfNum(productsData.value.pagination.total, ['товар', 'товара', 'товаров'])
        : 0
    })

    // Watching ====================
    watch(() => [
      page.value,
      filterPriceFrom.value,
      filterPiceTo.value,
      filterCategory.value,
      filterMaterials.value,
      filterSeasons.value

    ], () => {
      doLoadProducts()
    }, { immediate: true })

    return {
      productsData,
      products,
      page,
      pages,
      itemsOnPage,
      isLoading,
      isLoadFailed,
      filterPriceFrom,
      filterPiceTo,
      filterCategory,
      filterMaterials,
      filterSeasons,
      doLoadProducts,
      totalProducts
    }
  }
}
</script>

<style>

</style>>
