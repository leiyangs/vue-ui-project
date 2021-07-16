<template>
  <div :class="classes">
    <p>{{message}}</p>
  </div>
</template>

<script>
import { computed } from 'vue'
export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  setup (props) {
    const classes = computed(() => ['y-message', `y-message-${props.type}`])

    return {
      classes
    }
  }
}
</script>
