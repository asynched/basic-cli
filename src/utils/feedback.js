import colors from 'colors'

/**
 * @template T
 * @typedef LoadingMessageOptionsType
 * @property { string } message
 * @property { Promise<T> } promise
 */

export class LoadingMessage {
  static #loadingPattern = ['⡿', '⣟', '⣯', '⣷', '⣾', '⣽', '⣻', '⢿']

  /**
   * Prints a feedback message to stdout until the promise passed to it resolves
   * @template T Type of the given promise
   * @param { LoadingMessageOptionsType<T> } options Options
   * @returns { Promise<T> } Resolved value of the promise passed as an option
   */
  static async load({ message, promise }) {
    return new Promise((resolve, reject) => {
      let counter = 0

      const interval = setInterval(() => {
        const pattern = this.#loadingPattern[counter % this.#loadingPattern.length]
        process.stdout.write(`\r${colors.green(pattern)} ${message} `)
        counter++
      }, 50)

      promise
        .then(value => {
          clearInterval(interval)
          process.stdout.write('\n')
          resolve(value)
        })
        .catch(error => {
          process.stdout.write('\n')
          clearInterval(interval)
          reject(error)
        })
    })
  }
}
