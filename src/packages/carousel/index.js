import Carousel from './carousel.vue'
import '../../styles/carousel.scss'

Carousel.install = (app) => {
  app.component(Carousel.name, Carousel)
}

export default Carousel
