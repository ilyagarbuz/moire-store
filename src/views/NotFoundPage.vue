<template>
  <main>
    <div id="mainCard">
      <section>

        <div class="card">

          <p class="display-3 mt-2 font-staatliches">Упс!</p>

          <h2 class="text-danger mb-3 font-weight-bold font-staatliches"> Страница ненайдена...</h2>

          <router-link v-slot="{navigate}" :to="{name:'main'}" custom>
            <button class="button button--primery" @click="navigate">Перейти в каталог</button>
          </router-link>

        </div>

      </section>
    </div>
  </main>
</template>

<script>
export default {

}
</script>

<style scoped>
#mainCard{
  display: flex;
  min-height:100vh;
  align-items:center;
  justify-content: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  text-align: center;
  font-size: 30px;
  margin-bottom: 0;;
}

h2 {
  font-weight: normal;
  text-align: center;
  font-size: 40px;
}

button {
  width: max-content;
}
</style>
