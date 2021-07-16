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
</template>

<script>
import Button from './examples/button.vue'
import Icon from './examples/icon.vue'
import ButtonGroup from './examples/button-group.vue'
import Carousel from './examples/carousel.vue'
import Message from './examples/message.vue'
export default {
  name: 'App',
  components: {
    Button,
    Icon,
    ButtonGroup,
    Carousel,
    Message
  }
}
</script>

<style lang="scss" scoped>
div{
  margin-bottom: 20px;
}
</style>
