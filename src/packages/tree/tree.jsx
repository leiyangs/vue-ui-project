import { getCurrentInstance, provide, reactive, toRefs, watch } from 'vue'
import TreeNode from './tree-node'
import { flattenTree } from '../../utils'

export default {
  name: 'YTree',
  components: {
    TreeNode
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    load: {
      type: Function
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    const { data } = toRefs(props)
    let faltDataMap = flattenTree(data.value)

    watch(data.value, () => {
      faltDataMap = flattenTree(data.value)
    })

    const state = reactive({
      dropPosition: '', // 拖拽的位置
      dragNode: null, // 拖拽的数据
      draggingNode: null, // 拖拽的实例
      showIndicator: false // 是否显示指示器
    })

    const renderNode = (data) => {
      if (data.value && data.value.length === 0) {
        return <span>暂无数据</span>
      }

      return data.value.map(item => <TreeNode data={item}/>)
    }

    const methods = {
      getCheckedNodes () {
        return Object.values(faltDataMap).filter(item => item.node.checked)
      },
      // 选中子(选中当前的所有子)
      updateTreeDown (node, checked) {
        if (node.children) {
          node.children.forEach(child => {
            child.checked = checked
            methods.updateTreeDown(child, checked)
          })
        }
      },
      // 是否选中父(找到当前的父，如果父下的子都是选择状态，那么选中父)
      updateTreeUp (node, checked) {
        const parentNode = faltDataMap[node.key].parent
        if (!parentNode) return
        if (checked) {
          parentNode.checked = parentNode.children.every(child => child.checked)
        } else {
          parentNode.checked = false
        }
        methods.updateTreeUp(parentNode, checked)
      },
      dragStart (e, nodeInstance, data) {
        state.draggingNode = nodeInstance
        state.dragNode = data.value
      },
      dragOver (e, nodeInstance, data) {
        // 拖动到自己所在位置
        if (state.dragNode.key === data.value.key) {
          return false
        }
        // 不能拖拽到自己的子节点中
        const overEle = nodeInstance.ctx.$el
        if (state.draggingNode.ctx.$el.contains(overEle)) {
          return false
        }
        // 当前划过节点的位置
        const targetPosition = overEle.firstElementChild.getBoundingClientRect()
        // 选中树的位置
        const treePostion = instance.ctx.$el.getBoundingClientRect()
        // 拖拽移动的距离(在目标上)
        const distance = e.clientY - targetPosition.top

        if (distance < targetPosition.height * 0.2) {
          state.dropPosition = 1
        } else if (distance > targetPosition.height * 0.8) {
          state.dropPosition = -1
        } else {
          state.dropPosition = 0
        }

        // icon的距离
        const iconPosition = overEle.querySelector('.y-icon').getBoundingClientRect()
        // 指示器默认位置
        let indicatorTop = -99999
        if (state.dropPosition === 1) {
          indicatorTop = iconPosition.top - treePostion.top
        } else if (state.dropPosition === -1) {
          indicatorTop = iconPosition.bottom - treePostion.top
        }

        const indicator = instance.ctx.$refs.indicator
        indicator.style.top = indicatorTop + 'px'
        indicator.style.left = iconPosition.right - treePostion.left + 'px'
        state.showIndicator = (state.dropPosition === 1) || (state.dropPosition === -1)
      },
      dragEnd (e, nodeInstance, data) {
        state.dropPosition = ''
        state.dragNode = null
        state.draggingNode = null
        state.showIndicator = null
      }
    }

    provide('treeMethods', {
      treeMethods: methods,
      slot: ctx.slots.default,
      load: props.load,
      showCheckbox: props.showCheckbox,
      draggable: props.draggable
    })

    // 获取当前实例，并在上下文挂载方法
    const instance = getCurrentInstance()
    instance.ctx.getCheckedNodes = methods.getCheckedNodes

    return () => {
      return <div className="y-tree">
        {renderNode(data)}

        {/* 拖拽时候的线条指示器 */}
        <div class="y-tree-indicator" ref="indicator" vShow={state.showIndicator}></div>
      </div>
    }
  }
}
