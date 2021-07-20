import { toRefs } from 'vue'

export default {
  name: 'YTree',
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

      const renderChild = (child) => {
        return <div className="y-tree-node">
          <div className="y-tree-label">{ child.label }</div>
        </div>
      }

      return data.value.map(item => renderChild(item))
    }

    return () => {
      return <div className="y-tree">
        {renderNode(data)}
      </div>
    }
  }
}
