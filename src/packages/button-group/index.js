import ButtonGroup from './button-group.vue'

ButtonGroup.install = (app) => {
  app.component(ButtonGroup.name, ButtonGroup)
}

export default ButtonGroup
