<template>
  <div>
    按钮组：
    <y-button-group>
      <y-button type="primary" icon="arrow-double-left" @click="handlePrev">上一页</y-button>
      <y-button type="primary">上一页<y-icon icon="arrow-double-right"/></y-button>
    </y-button-group>
    <y-button-group>
      <y-button type="primary" icon="share"></y-button>
      <y-button type="primary" icon="edit"></y-button>
      <y-button type="primary" icon="delete"></y-button>
    </y-button-group>
  </div>
</template>

<script>
export default {
  setup () {
    // @click.native已被弃用
    const handlePrev = () => {
      alert('上一页')
    }
    return {
      handlePrev
    }
  }
}
</script>
