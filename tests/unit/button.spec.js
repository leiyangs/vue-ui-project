import { expect } from 'chai'
// import { shallowMount } from '@vue/test-utils'
import Button from '../../src/packages/button'
import Icon from '../../src/packages/icon'
import { createApp } from 'vue'

describe('Button.vue', () => {
  it('button正常显示？', () => {
    const container = document.createElement('div')
    const app = createApp({
      template: '<y-button>按钮</y-button>',
      components: {
        'y-button': Button
      }
    })
    app.use(Icon).mount(container)
    expect(app.$el.innerHtml).to.match(/按钮/)
  })
})
