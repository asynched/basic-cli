import FileSystemExtension from './file-system.extension.js'
import ModuleFactory from '../../lib/module-factory.js'
import MakeFolder from './make-folder/make-folder.module.js'

const FileSystem = ModuleFactory.makeModule({
  extension: FileSystemExtension,
  submodules: [MakeFolder],
})

export default FileSystem
