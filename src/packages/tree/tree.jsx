import { getCurrentInstance, toRefs } from 'vue'
import TreeNode from './tree-node'

export default {
  name: 'YTree',
  components: {
    TreeNode
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const { data } = toRefs(props)

    const renderNode = (data) => {
      if (data.value && data.value.length === 0) {
        return <span>暂无数据</span>
      }

      return data.value.map(item => <TreeNode data={item}/>)
    }

    const getCheckedNodes = () => {
      console.log('getCheckedNodes')
    }

    // 获取当前实例，并在上下文挂载方法
    const instance = getCurrentInstance()
    instance.ctx.getCheckedNodes = getCheckedNodes

    return () => {
      return <div className="y-tree">
        {renderNode(data)}
      </div>
    }
  }
}
