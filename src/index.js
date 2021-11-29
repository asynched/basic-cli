import CommandLineInterface from './lib/command-line-interface.js'
import JSONPlaceholder from './extensions/json-placeholder/json-placeholder.module.js'

const commandLineInterface = new CommandLineInterface({
  extensions: [JSONPlaceholder],
})

commandLineInterface.main()
