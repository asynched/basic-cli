export default class BaseExtension {
  /**
   * Constructor for the base extension
   * @param {string} prefix Prefix of the extension
   */
  constructor(prefix) {
    this.prefix = prefix
  }

  /**
   * @abstract Default method to be executed on the extension (entry point)
   */
  execute() {}
}
