const { response } = require('./responseStructure')

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = this.constructor.name
  }
}
const error = (err, req, res, next) => {
  let result = {}
  if (err instanceof ValidationError) {
    result = response([], false, 'raman' + err.message)
  } else if (err instanceof Error) {
    result = response([], false, err.message)
  }
  res.status(400).send(result).end()
}

module.exports = { error, ValidationError }
