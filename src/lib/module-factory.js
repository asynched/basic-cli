import inquirer from 'inquirer'
import { isEmpty } from '../utils/arrays.js'

/**
 * @template T
 * @typedef ModuleFactoryOptionsType
 * @property { new (...args) => import('../extensions/base/base-extension').default } extension
 * @property { import('../extensions/base/base-extension').default[]? } submodules
 */

export default class ModuleFactory {
  /**
   * Generates an instance of a BaseExtension
   * @template T Type of the instance
   * @param { ModuleFactoryOptionsType<T> } options
   * @returns { import('../extensions/base/base-extension').default }
   */
  static makeModule({ extension, submodules }) {
    if (isEmpty(submodules)) {
      return new extension()
    }

    const baseClassInstance = new extension()
    const options = submodules.map(submodule => submodule.prefix)

    return {
      prefix: baseClassInstance.prefix,
      async execute() {
        const { submodulePrefix } = await inquirer.prompt([
          {
            name: 'submodulePrefix',
            message: 'Which submodule do you want to execute?',
            choices: options,
            type: 'list',
          },
        ])

        const submodule = submodules.find(submodule => submodule.prefix === submodulePrefix)
        submodule.execute()
      },
    }
  }
}
