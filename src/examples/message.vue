<template>
  <y-button @click="handleVisible">打开</y-button>
</template>

<script>
import { ref } from 'vue'
import Message from '../packages/message'
export default {
  setup () {
    const count = ref(0)
    const handleVisible = () => {
      // 两种调用方式
      Message.success(`调用成功${count.value}`)
      // eslint-disable-next-line no-debugger
      // Message({ message: '调用成功', type: 'danger' })
      count.value = count.value + 1
    }

    return {
      handleVisible
    }
  }
}
</script>
