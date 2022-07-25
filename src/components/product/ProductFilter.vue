<template>
  <aside class="filter">
    <form class="filter__form form" action="#" @submit.prevent="doHandleSubmit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="tel" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" v-model="currentCategoryValue">
            <option value="0">Все категории</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{category.title}}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" :value="material.id" v-model="currentMaterialsValue">
              <span class="check-list__desc">
                {{material.title.toLowerCase()}}
                <span>({{material.productsCount}})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons" :key="season.id">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" :value="season.id" v-model="currentSeasonsValue">
              <span class="check-list__desc">
                {{season.title.toLowerCase()}}
                <span>({{season.productsCount}})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button ref="submitButton" class="filter__submit button button--primery" type="submit" :disabled="!isResetButton">
        Применить
      </button>
      <button v-if="isResetButton" class="filter__reset button button--second" type="button" @click="doHandleRest">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue'
import { API_BASE_URL } from '@/config'
import { useRouter } from 'vue-router'
export default {
  props: ['priceFrom', 'priceTo', 'categoryValue', 'materialsValue', 'seasonsValue', 'page'],
  setup (props, { emit }) {
    // Current filter values ====================
    const currentPriceFrom = ref(props.priceFrom)
    const currentPriceTo = ref(props.priceTo)
    const currentCategoryValue = ref(props.categoryValue)
    const currentMaterialsValue = ref(props.materialsValue)
    const currentSeasonsValue = ref(props.seasonsValue)

    // Handle filter submition ====================
    const submitButton = ref(null)
    const router = useRouter()
    const doHandleSubmit = () => {
      submitButton.value.blur()
      router.push({ name: 'main' })
      emit('update:priceFrom', currentPriceFrom.value)
      emit('update:priceTo', currentPriceTo.value)
      emit('update:categoryValue', currentCategoryValue.value)
      emit('update:materialsValue', currentMaterialsValue.value)
      emit('update:seasonsValue', currentSeasonsValue.value)
      emit('update:page', 1)
    }

    // Handle filter rest ====================
    const isResetButton = computed(() => {
      if (currentCategoryValue.value ||
        currentPriceTo.value ||
        currentPriceFrom.value ||
        currentMaterialsValue.value.length ||
        currentSeasonsValue.value.length
      ) {
        return true
      }
      return false
    })

    const doHandleRest = () => {
      emit('update:priceFrom', 0)
      emit('update:priceTo', 0)
      emit('update:categoryValue', 0)
      emit('update:materialsValue', [])
      emit('update:seasonsValue', [])
    }

    // Watching props ====================
    watch(() => [
      props.priceFrom,
      props.priceTo,
      props.categoryValue,
      props.materialsValue,
      props.seasonsValue
    ], ([priceFromNew, priceToNew, categoryNew, materiaslNew, seasonsNew]) => {
      currentPriceFrom.value = priceFromNew
      currentPriceTo.value = priceToNew
      currentCategoryValue.value = categoryNew
      currentMaterialsValue.value = materiaslNew
      currentSeasonsValue.value = seasonsNew
    })

    // Categories Catalog Loading ====================
    const categoriesData = ref(null)
    const categories = computed(() => {
      return categoriesData.value ? categoriesData.value.items : []
    })
    const doLoadCategories = async () => {
      const response = await fetch(API_BASE_URL + '/api/productCategories')
      categoriesData.value = await response.json()
    }

    // Materials Catalog Loading ====================
    const materialsData = ref(null)
    const materials = computed(() => {
      return materialsData.value ? materialsData.value.items : []
    })
    const doLoadMaterials = async () => {
      const response = await fetch(API_BASE_URL + '/api/materials')
      materialsData.value = await response.json()
    }

    // Seasons Catalog Loading ====================
    const seasonsData = ref(null)
    const seasons = computed(() => {
      return seasonsData.value ? seasonsData.value.items : []
    })
    const doLoadSeasons = async () => {
      const response = await fetch(API_BASE_URL + '/api/seasons')
      seasonsData.value = await response.json()
    }

    onMounted(() => {
      doLoadCategories()
      doLoadMaterials()
      doLoadSeasons()
    })

    return {
      categories,
      materials,
      seasons,
      currentPriceFrom,
      currentPriceTo,
      currentCategoryValue,
      currentMaterialsValue,
      currentSeasonsValue,
      doHandleSubmit,
      doHandleRest,
      submitButton,
      isResetButton
    }
  }

}
</script>

<style>
 .filter__submit:not(:disabled):active {
  transform: scale(0.8);
 }

 .filter__reset:active {
  transform: scale(0.8);
 }
</style>>
