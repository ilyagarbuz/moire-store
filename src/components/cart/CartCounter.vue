<template>
  <div class="form__counter">
    <button type="button" @click="amount--" aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" @blur="checkInput" v-model.number="amount" name="count">

    <button type="button" @click="amount++" aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: ['modelValue'],
  computed: {
    amount: {
      get () {
        return this.modelValue
      },

      set (modelValue) {
        if (modelValue < 1 || typeof modelValue !== 'number') {
          this.$emit('update:modelValue', 1)
        } else {
          this.$emit('update:modelValue', modelValue)
        }
      }
    }
  },
  methods: {
    checkInput (e) {
      if (e.target.value < 1 || typeof e.target.value !== 'number') e.target.value = 1
    }
  }
}
</script>

<style>

</style>
