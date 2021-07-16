<template>
  <div>
    <y-carousel height="150px" :autoplay="true" :interval="4000" :initial-index="0" :loop="true" arrow="hover" style="width:500px">
      <y-carousel-item v-for="item in list" :key="item.key" :style="{backgroundColor: item.bg}">
        <h1>{{item.key}}</h1>
      </y-carousel-item>
    </y-carousel>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup () {
    const state = reactive({
      list: [
        { key: 1, bg: '#d3dce6' },
        { key: 2, bg: '#99a9bf' },
        { key: 3, bg: '#d3dce6' },
        { key: 4, bg: '#99a9bf' }
      ]
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
