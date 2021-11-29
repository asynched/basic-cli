import util from 'util'

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
