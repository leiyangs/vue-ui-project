<template>
  <transition name="carousel-item">
    <div :class="classes" v-if="isVisible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import { computed, inject } from 'vue'
export default {
  name: 'YCarouselItem',
  setup () {
    const { state, changeIndex } = inject('current')
    const currentIndex = state.currentIndex

    const isVisible = computed(() => state.currentSelected === currentIndex)
    const classes = computed(() => ([state.reserve ? 'reserve' : '', 'y-carousel-item']))
    changeIndex()

    return {
      isVisible,
      classes
    }
  }
}
</script>
