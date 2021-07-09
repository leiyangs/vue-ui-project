<template>
  <div class="y-button-group">
    <slot></slot>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue'
export default {
  name: 'YButtonGroup',
  beforeCreate () {
    console.log(1)
  },
  setup (props, context) {
    onMounted(() => {
      const context = getCurrentInstance()
      console.log(context)
      const el = context.ctx.$el
      const children = el.children
      console.log(children)
    })
  }
}
</script>
