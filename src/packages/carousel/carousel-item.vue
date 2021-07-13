<template>
  <div class="y-carousel-item">
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'YCarouselItem',
  setup () {
    const { state, changeIndex } = inject('current')
    const currentIndex = state.currentIndex
    console.log(currentIndex, changeIndex)
    changeIndex()
  }
}
</script>
