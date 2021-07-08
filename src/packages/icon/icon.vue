<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
import { computed } from 'vue'
import './font'
export default {
  name: 'YIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const svgClass = computed(() => props.props ? 'y-icon ' + props.className : 'y-icon')
    const iconName = computed(() => `#icon-${props.icon}`)

    return {
      svgClass,
      iconName
    }
  }
}
</script>
