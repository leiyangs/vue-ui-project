<template>
  <div class="y-carousel" :style="styles">
    <div class="view-port">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, provide, reactive, toRefs } from 'vue'
export default {
  name: 'YCarousel',
  props: {
    height: {
      type: String,
      default: '150px'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    initialIndex: {
      type: Number,
      default: 0
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  setup (props) {
    const state = reactive({
      currentIndex: 0,
      len: 0 // 子组件个数
    })

    const changeIndex = () => {
      state.currentIndex++
    }
    provide('current', { state, changeIndex })

    onMounted(() => {
      state.len = state.currentIndex
      console.log(state.len)
    })

    const styles = computed(() => {
      return {
        height: props.height
      }
    })

    return {
      styles,
      ...toRefs(state)
    }
  }
}
</script>
