import axios from 'axios'
import fs from 'fs/promises'
import inquirer from 'inquirer'
import colors from 'colors'
import BaseExtension from '../base/base-extension.js'
import { prettyPrintJSON } from '../../utils/json.js'

export default class JSONPlaceholderExtension extends BaseExtension {
  constructor() {
    super('JSON Placeholder')
    this.BASE_URL = 'https://jsonplaceholder.typicode.com'
    this.API_ENDPOINTS = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']
  }

  async execute() {
    const { endpoint, amountOfItems } = await this.#promptForEndpointAndAmount()
    const handler = this.#getHandlerFunction(amountOfItems)
    const apiData = await handler(endpoint)
    const { saveToFile } = await this.#promptForSavingToFile()

    if (saveToFile) {
      return this.#handleSaveToFile(apiData)
    }

    this.#handleWriteToSTDOUT(apiData)
  }

  async #promptForSavingToFile() {
    return await inquirer.prompt([
      {
        type: 'confirm',
        name: 'saveToFile',
        message: 'Do you want to save it to a file?',
      },
    ])
  }

  async #promptForEndpointAndAmount() {
    return await inquirer.prompt([
      {
        type: 'list',
        name: 'endpoint',
        message: 'Select an endpoint',
        choices: this.API_ENDPOINTS,
      },
      {
        type: 'list',
        name: 'amountOfItems',
        message: 'How many items do you want to get?',
        choices: ['single', 'many'],
      },
    ])
  }

  async #promptForFilename() {
    return await inquirer.prompt([
      {
        name: 'filename',
        type: 'input',
        message: 'Type in the filename: ',
      },
    ])
  }

  async #promptForItemId() {
    return await inquirer.prompt([
      {
        name: 'itemId',
        type: 'number',
        message: 'Type in the item id: ',
      },
    ])
  }

  #getHandlerFunction(amountOfItems) {
    switch (amountOfItems) {
      case 'single':
        return this.#getSingleItem.bind(this)
      case 'many':
        return this.#getManyItems.bind(this)
    }
  }

  async #handleSaveToFile(data) {
    const { filename } = await this.#promptForFilename()
    await fs.writeFile(filename, JSON.stringify(data, null, 4))
    console.log(
      colors.green('!'),
      colors.bold('Successfully written to:'),
      colors.cyan(`${filename}`)
    )
  }

  #handleWriteToSTDOUT(data) {
    prettyPrintJSON(data)
  }

  async #getManyItems(endpoint) {
    const { data } = await axios.get(`${this.BASE_URL}/${endpoint}`)
    return data
  }

  async #getSingleItem(endpoint) {
    const { itemId } = await this.#promptForItemId()

    const { data } = await axios.get(`${this.BASE_URL}/${endpoint}/${itemId}`)

    return data
  }
}
