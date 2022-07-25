<template>
  <div class="reload-box">
    <p class="reload-text">{{text}}</p>
    <button class="button button--primery" @click.prevent="$emit('reload-data')">Попробовать ещё раз</button>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }

}
</script>

<style>
  .reload-box {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    padding-top: 20px;
    padding-bottom: 30px;
  }
</style>>
