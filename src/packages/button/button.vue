<template>
  <button :class="classes" :disabled="loading">
    <y-icon v-if="icon && !loading" :icon="icon"/>
    <y-icon v-if="loading" class="loading" icon="loading"/>
    <slot></slot>
  </button>
</template>

<script>
import { computed } from 'vue'
export default {
  name: 'YButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator (type) {
        if (!['primary', 'warning', 'danger', 'success', 'info'].includes(type)) {
          throw new Error('y-button中type只能传入' + ['primary', 'warning', 'danger', 'success', 'info'].join(','))
        }
        return true
      }
    },
    icon: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const classes = computed(() => [
      'y-button',
      `y-button-${props.type}`
    ])

    return {
      classes
    }
  }
}
</script>
