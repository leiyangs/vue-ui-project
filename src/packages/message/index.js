import { createApp } from 'vue'
import MessageComponent from './message.vue'
import '../../styles/message.scss'

const types = ['success', 'warning', 'info', 'error']

const wrapper = document.createElement('div')
const styles = {
  minWidth: '380px',
  position: 'fixed',
  left: '50%',
  top: '20px',
  zIndex: 9999,
  transform: 'translateX(-50%)',
  padding: '15px 15px 15px 20px'
}
for (const key in styles) {
  if (Object.hasOwnProperty.call(styles, key)) {
    const style = styles[key]
    wrapper.style[key] = style
  }
}
document.body.appendChild(wrapper)

// Message({message: '我是消息', type: 'success'})
const Message = (options) => {
  const messageBox = document.createElement('div')
  messageBox.className = 'y-message-box'
  const app = createApp(MessageComponent, options)
  app.mount(messageBox)
  wrapper.appendChild(messageBox)

  setTimeout(() => {
    app.unmount()
    wrapper.removeChild(messageBox)
  }, options.duration || 3000)
}

// Message.success('我是消息')
types.forEach(type => {
  Message[type] = function (opts) {
    let options = {}
    if (typeof opts === 'string') {
      options = {
        message: opts,
        duration: 3000
      }
    }
    options.type = type

    return Message(options)
  }
})

export default Message
