/*
 * A utility to check if all values in an object are not undefined
 */

module.exports = function check(values) {
  let errors = []
  
  // Create an error for each undefined key
  Object.keys(values).forEach(key => {
    if (values[key] === undefined) {
      errors.push(`[error] ${key} is not set`)
    }
  })
  
  // Log each error
  errors.forEach(err => console.log(err))
  
  // Exit if there were any errors
  if (errors.length > 0) {
    process.exit(1)
  }
}
