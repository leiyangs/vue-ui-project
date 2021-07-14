<template>
  <div class="y-carousel-item" v-if="isVisible">
    <slot></slot>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
export default {
  name: 'YCarouselItem',
  setup () {
    const { state, changeIndex } = inject('current')
    const currentIndex = state.currentIndex

    const isVisible = computed(() => state.currentSelected === currentIndex)
    changeIndex()

    return {
      isVisible
    }
  }
}
</script>
