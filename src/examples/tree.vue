<template>
  <y-tree :data="data" ref="tree" show-checkbox draggable :load="loadNode">
    <template v-slot="{label}">
      <span>自定义显示({{label}})</span>
    </template>
  </y-tree>
  <y-button type="primary" size="mini" @click="getChecked">点击获取选中</y-button>
</template>

<script>
import { reactive, toRefs, ref } from 'vue'
export default {
  setup () {
    const tree = ref(null)
    const state = reactive({
      data: [{
        id: 1,
        label: '一级 1',
        children: []
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }]
    })

    const getChecked = () => {
      const checkedNodes = tree.value.getCheckedNodes()
      console.log(checkedNodes)
    }

    const loadNode = (node, resolve) => {
      if (node.id === 1) {
        setTimeout(() => {
          resolve([{
            id: 4,
            label: '二级 1-1',
            children: []
          }])
        }, 500)
      }
      if (node.id === 4) {
        setTimeout(() => {
          resolve([{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }])
        }, 500)
      }
    }

    return {
      ...toRefs(state),
      getChecked,
      tree,
      loadNode
    }
  }
}
</script>
