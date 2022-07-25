<template>
  <div class="item__content">
    <h3>{{content}}</h3>

  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
  props: ['productContent'],
  setup (props) {
    const content = computed(() => {
      return props.productContent ? props.productContent : 'Нет информации о товаре'
    })

    return {
      content
    }
  }

}
</script>

<style>

</style>>
