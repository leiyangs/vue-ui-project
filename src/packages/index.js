// 总入口
import Button from './button'
import ButtonGroup from './button-group'
import Icon from './icon'
import Carousel from './carousel'
import CarouselItem from './carousel-item'
import Tree from './tree'

const plugins = [
  Button,
  ButtonGroup,
  Icon,
  Carousel,
  CarouselItem,
  Tree
]

// 让所有的插件都执行
const install = (app) => {
  plugins.forEach(plugin => app.use(plugin))
}

export default {
  install
}
