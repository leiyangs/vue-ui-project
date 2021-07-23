import { getCurrentInstance, provide, toRefs } from 'vue'
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
    }
  },
  setup (props, ctx) {
    const { data } = toRefs(props)
    const faltDataMap = flattenTree(data.value)

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
      }
    }

    provide('treeMethods', { treeMethods: methods, slot: ctx.slots.default, load: props.load, showCheckbox: props.showCheckbox })

    // 获取当前实例，并在上下文挂载方法
    const instance = getCurrentInstance()
    instance.ctx.getCheckedNodes = methods.getCheckedNodes

    return () => {
      return <div className="y-tree">
        {renderNode(data)}
      </div>
    }
  }
}
