import Tree from './tree.jsx'
import '../../styles/tree.scss'

Tree.install = (app) => {
  app.component(Tree.name, Tree)
}

export default Tree
