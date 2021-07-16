<template>
  <y-button @click="handleVisible">打开</y-button>
</template>

<script>
import Message from '../packages/message'
export default {
  setup () {
    const handleVisible = () => {
      // 两种调用方式
      Message.success('调用成功')
      // Message({ message: '调用成功', type: 'danger' })
    }

    return {
      handleVisible
    }
  }
}
</script>
