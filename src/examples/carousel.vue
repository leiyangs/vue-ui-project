<template>
  <div>
    <y-carousel height="150px" :autoplay="true" :interval="4000" :initial-index="0" :loop="true" style="width:500px">
      <y-carousel-item v-for="item in list" :key="item.key" :style="{backgroundColor: item.bg}">{{item.key}}</y-carousel-item>
    </y-carousel>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup () {
    const state = reactive({
      list: [
        { key: 0, bg: 'red' },
        { key: 1, bg: 'blue' },
        { key: 2, bg: 'yellow' }
      ]
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
