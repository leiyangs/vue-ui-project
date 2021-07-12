<template>
  <div class="y-button-group">
    <slot></slot>
  </div>
</template>

<script>
import { getCurrentInstance, onMounted } from 'vue'
export default {
  name: 'YButtonGroup',
  setup (props, context) {
    onMounted(() => {
      const context = getCurrentInstance() // 获取实例相当于vue2中this
      const el = context.ctx.$el
      const children = el.children
      for (let i = 0; i < children.length; i++) {
        console.assert(children[i].tagName === 'BUTTON', 'button-group中只能放button')
      }
    })
  }
}
</script>
