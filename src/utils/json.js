import util from 'util'

/**
 * Pretty prints a JSON to stdout
 * @param { any } json JSON data to be printed
 */
export function prettyPrintJSON(json) {
  console.log(
    util.inspect(json, {
      breakLength: null,
      colors: true,
      compact: false,
      depth: Infinity,
      maxArrayLength: Infinity,
    })
  )
}
