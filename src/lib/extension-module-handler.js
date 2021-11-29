export default class ExtensionModuleHandler {
  /**
   * @template T
   * @param { T } baseClass
   * @returns { InstanceType<T> }
   */
  static makeInstance(baseClass) {
    return new baseClass()
  }
}
