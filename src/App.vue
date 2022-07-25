<template>

  <BaseHeader />

  <router-view></router-view>

  <BaseFooter />

</template>

<script>
import BaseFooter from '@/components/base/BaseFooter.vue'
import BaseHeader from '@/components/base/BaseHeader.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  components: { BaseFooter, BaseHeader },
  methods: {
    ...mapActions(['doLoadCartData']),
    ...mapMutations(['updateUserAccessKey'])
  },
  created () {
    const userAccessKey = localStorage.getItem('userAccessKey')
    if (userAccessKey) this.updateUserAccessKey(userAccessKey)
    this.doLoadCartData()
  }
}
</script>
