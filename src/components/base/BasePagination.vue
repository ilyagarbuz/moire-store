<template>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" @click.prevent="paginate(page - 1)" :class="{'pagination__link--disabled': page === 1}" href="#" aria-label="Предыдущая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left"></use>
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNumber in pages" :key="pageNumber">
        <a class="pagination__link" href="#" @click.prevent="paginate(pageNumber)" :class="{'pagination__link--current': pageNumber === page}">
          {{pageNumber}}
        </a>
      </li>
      <li class="pagination__item">
        <a class="pagination__link pagination__link--arrow" @click.prevent="paginate(page + 1)" :class="{'pagination__link--disabled': page === pages}" href="#" aria-label="Следующая страница">
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right"></use>
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>

export default {
  props: ['page', 'pages'],
  setup (props, { emit }) {
    const paginate = (pageNum) => {
      if (pageNum < 1 || pageNum > props.pages) {
        return
      }
      emit('update:page', pageNum)
    }

    return {
      paginate
    }
  }

}
</script>

<style>

</style>>
