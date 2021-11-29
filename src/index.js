import CommandLineInterface from './lib/command-line-interface.js'
import JSONPlaceholder from './extensions/json-placeholder/json-placeholder.module.js'
import FileSystem from './extensions/file-system/file-system.module.js'

const commandLineInterface = new CommandLineInterface({
  extensions: [JSONPlaceholder, FileSystem],
})

commandLineInterface.main()
