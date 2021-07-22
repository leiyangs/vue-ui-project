import { computed, inject, toRefs, withModifiers } from 'vue'

export default {
  name: 'YTreeNode',
  props: {
    data: {
      type: Object
    }
  },
  setup (props) {
    const { data } = toRefs(props)
    const showIcon = computed(() => data.value.children && data.value.children.length > 0)
    const { treeMethods, slot } = inject('treeMethods')

    const classes = computed(() => [
      'y-tree-node',
      showIcon.value && 'y-tree-node-show-icon'
    ])

    const methods = {
      handleExpand () {
        data.value.isExpand = !data.value.isExpand
      },
      handleCheck () {
        data.value.checked = !data.value.checked
        treeMethods.updateTreeDown(data.value, data.value.checked)
        treeMethods.updateTreeUp(data.value, data.value.checked)
      }
    }
    return () => {
      return <div class={classes.value}>
        <div className="y-tree-node-content" onClick={methods.handleExpand}>
          <y-icon class="y-tree-node__expand-icon" icon="arrow-right-filling" />
          {/* withModifiers 事件修饰器 */}
          <input type="checkbox" checked={data.value.checked} onClick={withModifiers(methods.handleCheck, ['stop'])} />
          {slot ? slot(data.value) : <span className="y-tree-label">{data.value.label}</span>}
        </div>
        <div className="y-tree-node_children" vShow={data.value.isExpand}>
          {data.value.children && data.value.children.map(item => <y-tree-node data={item}/>)}
        </div>
      </div>
    }
  }
}
