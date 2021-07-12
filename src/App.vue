<template>
  <div>
    <Button></Button>
  </div>
  <div>
    <Icon></Icon>
  </div>
  <div>
    <ButtonGroup></ButtonGroup>
  </div>
</template>

<script>
import Button from './examples/button.vue'
import Icon from './examples/icon.vue'
import ButtonGroup from './examples/button-group.vue'
export default {
  name: 'App',
  components: {
    Button,
    Icon,
    ButtonGroup
  }
}
</script>

<style lang="scss" scoped>
div{
  margin-bottom: 20px;
}
</style>
