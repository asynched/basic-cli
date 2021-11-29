import JSONPlaceholderExtension from './json-placeholder.extension.js'
import ModuleFactory from '../../lib/module-factory.js'

const JSONPlaceholder = ModuleFactory.makeModule({
  extension: JSONPlaceholderExtension,
})

export default JSONPlaceholder
