import MakeFolderExtension from './make-folder.extension.js'
import ModuleFactory from '../../../lib/module-factory.js'

const MakeFolder = ModuleFactory.makeModule({
  extension: MakeFolderExtension,
})

export default MakeFolder
