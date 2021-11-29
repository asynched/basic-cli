export default class ExtensionModuleHandler {
  /**
   * Generates an instance of a BaseExtension
   * @template T Type of the instance
   * @param { T } baseClass Class of the instance
   * @returns { InstanceType<T> } Instantiated object of the given class
   */
  static makeInstance(baseClass) {
    return new baseClass()
  }
}
