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
</template>

<script>
import Button from './examples/button.vue'
import Icon from './examples/icon.vue'
import ButtonGroup from './examples/button-group.vue'
import Carousel from './examples/carousel.vue'
export default {
  name: 'App',
  components: {
    Button,
    Icon,
    ButtonGroup,
    Carousel
  }
}
</script>

<style lang="scss" scoped>
div{
  margin-bottom: 20px;
}
</style>
