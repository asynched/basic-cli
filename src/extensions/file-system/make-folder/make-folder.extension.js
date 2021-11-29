import fs from 'fs/promises'
import inquirer from 'inquirer'
import BaseExtension from '../../base/base-extension.js'

export default class MakeFolderExtension extends BaseExtension {
  constructor() {
    super('Make folder')
  }

  #validateFolderName(name) {
    if (name.length === 0) {
      throw new Error('Invalid folder name')
    }

    return true
  }

  async execute() {
    const { folderName } = await inquirer.prompt([
      {
        name: 'folderName',
        message: 'Type in the name of the folder:',
        validate: this.#validateFolderName,
      },
    ])

    await fs.mkdir(folderName)
  }
}
