<template>
  <div class="y-carousel clearfix" :style="styles" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div class="view-port">
      <button v-if="arrow" type="button" class="y-carousel-arrow y-carousel-arrow-left" @click="go(currentSelected-1, true)">
        <y-icon icon="arrow-double-left"/>
      </button>
      <button v-if="arrow" type="button" class="y-carousel-arrow y-carousel-arrow-right" @click="go(currentSelected+1,true)">
        <y-icon icon="arrow-double-right"/>
      </button>
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
    },
    arrow: {
      type: String,
      default: 'always'
    }
  },
  setup (props) {
    const state = reactive({
      currentIndex: 0, // 对应自组件索引
      len: 0, // 子组件个数
      currentSelected: props.initialIndex, // 当前显示第几个
      reserve: false, // 反向轮播
      arrow: props.arrow === 'always'
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

    var timer = null
    const methods = {
      async go (newIndex, flag) {
        if (newIndex === state.len) newIndex = 0
        if (newIndex === -1)newIndex = state.len - 1

        const index = state.currentSelected
        // 正向轮播还是反向轮播
        state.reserve = index > newIndex
        if ((timer || flag) && props.loop) {
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
        if (props.arrow === 'hover') {
          state.arrow = true
        }
      },
      onMouseLeave () {
        methods.run()
        if (props.arrow === 'hover') {
          state.arrow = false
        }
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
