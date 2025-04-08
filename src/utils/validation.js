const Joi = require('joi')
const { ValidationError } = require('../utils/errorHandler')

const isValidUpdateDetails= async (req, res, next) => {
  
  const id = req.params.id
  const data=req.body
  const schema = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    age: Joi.number().required(),
    math: Joi.number().required(),
    science: Joi.number().required(),
    english: Joi.number().required(),
  })
  const valid = await schema.validate({ ...data,id })

  if (valid.error) {
    console.log(valid.error)
    next(new ValidationError(valid.error))
  } else {
    next()
  }
}
const isValidId = async (req, res, next) => {
  console.log(req.params)
  const id = req.params.id
  console.log('its m', id)
  const schema = Joi.object({
    id: Joi.number().required(),
  })
  const valid = await schema.validate({ id })

  if (valid.error) {
    console.log(valid.error)
    next(new ValidationError(valid.error))
  } else {
    next()
  }
}
const isValidFetchDetails = async (req, res, next) => {
  const data = req.query
  const schema = Joi.object({
    limit: Joi.number(),
    page: Joi.number(),
  })
  const valid = await schema.validate(data)

  if (valid.error) {
    console.log(valid.error)
    next(new ValidationError(valid.error))
  } else {
    next()
  }
}
const isValidStudentDetails = async (req, res, next) => {
  const data = req.body
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    age: Joi.number().required(),
    math: Joi.number().required(),
    science: Joi.number().required(),
    english: Joi.number().required(),
  })
  const valid = await schema.validate(data)

  if (valid.error) {
    console.log(valid.error)
    next(new ValidationError(valid.error))
  } else {
    next()
  }
}

module.exports = {
  isValidStudentDetails,
  isValidFetchDetails,
  isValidId,
  isValidUpdateDetails,
}
