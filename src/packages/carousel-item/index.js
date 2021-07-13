// 仅为了注册用
import CarouselItem from '../carousel/carousel-item.vue'
import '../../styles/carousel-item.scss'

CarouselItem.install = (app) => {
  app.component(CarouselItem.name, CarouselItem)
}

export default CarouselItem
