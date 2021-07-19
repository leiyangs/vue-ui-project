import { toRefs } from '_vue@3.1.4@vue'

export default {
  name: 'YTree',
  props: {
    data: {
      type: Array,
      require: true
    }
  },
  setup (props) {
    const { data } = toRefs(props)
    console.log(data.value)
    return () => {
      return <h1>哈哈哈哈</h1>
    }
  }
}
