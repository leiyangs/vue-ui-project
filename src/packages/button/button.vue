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
      default: '',
      validator (type) {
        if (type === '') return true
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
    },
    size: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const classes = computed(() => [
      'y-button',
      `y-button-${props.type}`,
      `y-button-${props.size}`
    ])

    return {
      classes
    }
  }
}
</script>
