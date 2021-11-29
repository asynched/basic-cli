import axios from 'axios'
import fs from 'fs/promises'
import inquirer from 'inquirer'
import colors from 'colors'
import BaseExtension from '../base/base-extension.js'
import { prettyPrintJSON } from '../../utils/json.js'
import { LoadingMessage } from '../../utils/feedback.js'

export default class JSONPlaceholderExtension extends BaseExtension {
  constructor() {
    super('JSON Placeholder')
    this.BASE_URL = 'https://jsonplaceholder.typicode.com'
    this.API_ENDPOINTS = ['posts', 'comments', 'albums', 'photos', 'todos', 'users']
  }

  /**
   * Main method of the JSON placeholder extension
   * @returns
   */
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

  /**
   * Displays a message asking if the user wants to save the file or not
   * @returns { Promise<{ saveToFile: boolean }> }
   */
  async #promptForSavingToFile() {
    return await inquirer.prompt([
      {
        type: 'confirm',
        name: 'saveToFile',
        message: 'Do you want to save it to a file?',
      },
    ])
  }

  /**
   * Prompts the user for the API endpoint and the amount of items he wants to have returned
   * @returns { Promise<{ endpoint: string, amountOfItems: 'single' | 'many' }> }
   */
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

  /**
   * Prompts the user for a filename
   * @returns { Promise<{ filename: string }> }
   */
  async #promptForFilename() {
    return await inquirer.prompt([
      {
        name: 'filename',
        type: 'input',
        message: 'Type in the filename:',
      },
    ])
  }

  /**
   * Prompts the user for an item id of the endpoint
   * @returns { Promise<{ itemId: number }> }
   */
  async #promptForItemId() {
    return await inquirer.prompt([
      {
        name: 'itemId',
        type: 'number',
        message: 'Type in the item id:',
      },
    ])
  }

  /**
   * Gets a handler function dependent on the amount of items
   * @param { 'single' | 'many' } amountOfItems Amount of items to get from the API
   * @returns { (endpoint: string) => Promise<any> } Handler function
   */
  #getHandlerFunction(amountOfItems) {
    switch (amountOfItems) {
      case 'single':
        return this.#getSingleItem.bind(this)
      case 'many':
        return this.#getManyItems.bind(this)
    }
  }

  /**
   * Saves JSON to a file
   * @param { any } data Data to be saved
   */
  async #handleSaveToFile(data) {
    const { filename } = await this.#promptForFilename()
    await fs.writeFile(filename, JSON.stringify(data, null, 4))
    console.log(
      colors.green('!'),
      colors.bold('Successfully written to:'),
      colors.cyan(`${filename}`)
    )
  }

  /**
   * Pretty prints data to STDOUT
   * @param { any } data Data to be printed
   */
  #handleWriteToSTDOUT(data) {
    prettyPrintJSON(data)
  }

  /**
   * Gets a list of items from a given API endpoint
   * @param { string } endpoint API endpoint
   * @returns { Promise<any[]> } Data from the API
   */
  async #getManyItems(endpoint) {
    const { data } = await LoadingMessage.load({
      message: colors.bold('Fetching data...'),
      promise: axios.get(`${this.BASE_URL}/${endpoint}`),
    })

    return data
  }

  /**
   * Gets an item from a given API endpoint
   * @param { string } endpoint API endpoint
   * @returns { Promise<any> } Data from the API
   */
  async #getSingleItem(endpoint) {
    const { itemId } = await this.#promptForItemId()

    const { data } = await LoadingMessage.load({
      message: colors.bold('Fetching data...'),
      promise: axios.get(`${this.BASE_URL}/${endpoint}/${itemId}`),
    })

    return data
  }
}
