import inquirer from 'inquirer'
import { unique } from '../utils/arrays.js'

/**
 * @typedef CommandLineInterfaceOptionsType
 * @property { import('../extensions/base/base-extension').default[] } extensions List of all extensions available
 */

export default class CommandLineInterface {
  /**
   * Generates a new command line interface object
   * @param { CommandLineInterfaceOptionsType } options Options for the command line interface
   */
  constructor({ extensions }) {
    this.extensions = extensions
    this.#validateExtensions()
  }

  #validateExtensions() {
    const uniqueExtensions = unique(this.extensions.map(extension => extension.prefix))

    if (this.extensions.length !== uniqueExtensions.length) {
      throw new Error(
        'There are multiple extensions with the same prefix, please fix it and then try to run again.'
      )
    }
  }

  /**
   * Gets the user selected extension using it's prefix
   * @param { string } extensionPrefix Extension's prefix
   * @returns { import('../extensions/base/base-extension').default } Extension selected
   */
  #getSelectedExtension(extensionPrefix) {
    const extension = this.extensions.find(extension => extension.prefix === extensionPrefix)

    if (!extension) {
      throw new Error('The extension you were trying to run is not available')
    }

    return extension
  }

  async main() {
    const prefixes = this.extensions.map(extension => extension.prefix)

    const { extensionPrefix } = await inquirer.prompt([
      {
        type: 'list',
        name: 'extensionPrefix',
        message: 'Which extension do you want to run?',
        choices: prefixes,
      },
    ])

    const selectedExtension = this.#getSelectedExtension(extensionPrefix)
    selectedExtension.execute()
  }
}
