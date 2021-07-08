import Button from './button.vue'
import '../../styles/button.scss'

// 可以在main.js中单独引入 app.use(Button)

Button.install = (app) => {
  app.component(Button.name, Button)
}

export default Button
