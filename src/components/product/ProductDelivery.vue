<template>
  <BaseLoader v-if="isLoading"/>
  <BaseReload v-else-if="isLoadFailed" @reload-data="doLoadDeliveryData" :text="'Не удалось загрузить данные о доставке :('"/>
  <div v-else class="item__content">
    <h3>Доставка:</h3>

    <ol>
      <li v-for="delivery in deliveries" :key="delivery.id">{{delivery.title}}: {{delivery.price}} ₽</li>
    </ol>

    <h3>Возврат:</h3>

    <p>
      Любой возврат должен быть осуществлен в течение 30 дней с момента отгрузки.
      Возвраты в магазине БЕСПЛАТНО.
      Вы можете вернуть товары в любой магазин. Магазин должен быть расположен в стране, в которой Вы осуществили покупку.
      БЕСПЛАТНЫЙ возврат в Пункт выдачи заказов.
      Для того чтобы вернуть товар в одном из наших Пунктов выдачи заказов, позвоните по телефону 8 800 600 90 09
    </p>

  </div>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL } from '@/config'
import { ref } from '@vue/reactivity'
import BaseLoader from '@/components/ui/BaseLoader.vue'
import BaseReload from '@/components/ui/BaseReload.vue'
export default {
  components: {
    BaseLoader,
    BaseReload
  },
  setup () {
    const deliveries = ref([])
    const isLoading = ref(false)
    const isLoadFailed = ref(false)

    const doLoadDeliveryData = async () => {
      try {
        isLoading.value = true
        isLoadFailed.value = false

        const response = await axios.get(API_BASE_URL + '/api/deliveries')
        deliveries.value = response.data
        if (response.statusText !== 'OK') throw new Error('Bad Response')
      } catch (error) {
        isLoadFailed.value = true
      } finally {
        isLoading.value = false
      }
    }
    doLoadDeliveryData()

    return {
      deliveries,
      isLoading,
      isLoadFailed,
      doLoadDeliveryData
    }
  }

}
</script>

<style scoped>
.load-box {
  height: 300px;
}

</style>>
