<template>
  <div class="y-carousel clearfix" :style="styles" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="view-port">
      <slot></slot>
    </div>
    <ul class="dots">
      <li v-for="(dot,index) in len" :key="dot" :class="[currentSelected===index?'is-active':'']" @mouseenter="go(index)">
        <span class="dot-button"></span>
      </li>
    </ul>
  </div>
</template>

<script>
import { computed, nextTick, onMounted, provide, reactive, toRefs } from 'vue'
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
      default: 1000
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
      currentIndex: 0, // 对应自组件索引
      len: 0, // 子组件个数
      currentSelected: props.initialIndex, // 当前显示第几个
      reserve: false // 反向轮播
    })

    const changeIndex = () => {
      state.currentIndex++
    }
    provide('current', { state, changeIndex })

    const styles = computed(() => {
      return {
        height: props.height
      }
    })

    let timer = null
    const methods = {
      async go (newIndex) {
        if (newIndex === state.len) newIndex = 0
        if (newIndex === -1)newIndex = state.len - 1

        const index = state.currentSelected
        // 正向轮播还是反向轮播
        state.reserve = index > newIndex
        if (timer && props.loop) {
          // 0=>3
          if (index === 0 && newIndex === state.len - 1) {
            state.reserve = true
          }
          // 3=>0
          if (index === state.len - 1 && newIndex === 0) {
            state.reserve = false
          }
        }
        await nextTick()
        state.currentSelected = newIndex
      },
      run () {
        if (props.autoplay) {
          timer = setInterval(() => {
            let index = state.currentSelected
            const newIndex = ++index
            methods.go(newIndex)
          }, props.interval)
        }
      },
      onMouseEnter () {
        clearInterval(timer)
        timer = null
      },
      onMouseLeave () {
        methods.run()
      }
    }

    onMounted(() => {
      state.len = state.currentIndex
      methods.run()
    })

    return {
      styles,
      ...toRefs(state),
      ...methods
    }
  }
}
</script>
