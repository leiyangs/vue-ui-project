<template>
  <div>
    <Button/>
  </div>
  <div>
    <Icon/>
  </div>
  <div>
    <ButtonGroup/>
  </div>
  <div>
    <Carousel/>
  </div>
  <div>
    <Message/>
  </div>
  <div>
    <Tree/>
  </div>
</template>

<script>
import Button from './examples/button.vue'
import Icon from './examples/icon.vue'
import ButtonGroup from './examples/button-group.vue'
import Carousel from './examples/carousel.vue'
import Message from './examples/message.vue'
import Tree from './examples/tree.vue'
export default {
  name: 'App',
  components: {
    Button,
    Icon,
    ButtonGroup,
    Carousel,
    Message,
    Tree
  }
}
</script>

<style lang="scss" scoped>
div{
  margin-bottom: 20px;
}
</style>
