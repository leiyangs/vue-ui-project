import { computed, getCurrentInstance, inject, ref, toRefs, withModifiers } from 'vue'

export default {
  name: 'YTreeNode',
  props: {
    data: {
      type: Object
    }
  },
  setup (props) {
    const { data } = toRefs(props)
    const showIcon = computed(() => (data.value.children && data.value.children.length > 0) || (load && !isLoaded.value)) // 是否显示箭头icon
    const isLoaded = ref(false) // load后是否有儿子
    const { treeMethods, slot, load, showCheckbox, draggable } = inject('treeMethods')

    const classes = computed(() => [
      'y-tree-node',
      showIcon.value && 'y-tree-node-show-icon',
      draggable && 'is-draggable'
    ])

    const methods = {
      handleExpand () {
        // 如果是收起
        if (!data.value.isExpand) {
          if (data.value.children && data.value.children.length === 0) {
            if (load) {
              data.value.loading = true
              isLoaded.value = false
              load(data.value, (children) => {
                data.value.children = children
                data.value.loading = false
              })
            }
          } else {
            isLoaded.value = true
          }
        }
        data.value.isExpand = !data.value.isExpand
      },
      handleCheck () {
        data.value.checked = !data.value.checked
        treeMethods.updateTreeDown(data.value, data.value.checked)
        treeMethods.updateTreeUp(data.value, data.value.checked)
      }
    }

    const instance = getCurrentInstance()

    const dragEvent = {
      ...(draggable ? {
        onDragstart (e) {
          e.stopPropagation()
          treeMethods.dragStart(e, instance, data)
        },
        onDragover (e) {
          e.stopPropagation()
          treeMethods.dragOver(e, instance, data)
        },
        onDragend (e) {
          e.stopPropagation()
          treeMethods.dragEnd(e, instance, data)
        }
      } : {})
    }

    return () => {
      return <div class={classes.value} {...dragEvent}>
        <div className="y-tree-node-content" onClick={methods.handleExpand}>
          <y-icon class={['y-tree-node__expand-icon', data.value.isExpand ? 'is_expand' : '']} icon="arrow-right-filling" />
          {/* withModifiers 事件修饰器 */}
          <input type="checkbox" vShow={showCheckbox} checked={data.value.checked} onClick={withModifiers(methods.handleCheck, ['stop'])} />
          {data.value.loading ? <y-icon class="loading" icon="loading"/> : null}
          {slot ? slot(data.value) : <span className="y-tree-label">{data.value.label}</span>}
        </div>
        <div className="y-tree-node_children" vShow={data.value.isExpand}>
          {data.value.children && data.value.children.map(item => <y-tree-node data={item}/>)}
        </div>
      </div>
    }
  }
}
