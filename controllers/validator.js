const { string } = require('joi')
const Joi = require('joi')

const validator = {
  validNewAccount: (req, res, next) => {
    const schema = Joi.object({
      firstName: Joi.string().trim().required().min(2).max(20),
      lastName: Joi.string().trim().required().min(2).max(20),
      urlPic: Joi.string().trim().required().min(5),
      username: Joi.string().trim().required().email({ tlds: { allow: false } }),
      password: Joi.string().trim().required(), //.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      country: Joi.string().trim().min(3),
      rol: Joi.string().trim()
    })

    const validation = schema.validate(req.body, { abortEarly: false })

    !validation.error ? next() : res.json({ success: false, errors: validation.error })
  },
  isAdmin: (req, res, next) => {
    if (req.user.rol === 'admin') {
      next()
    } else {
      res.json({ success: false, mensaje: 'Usted NO ES ADMIN, fuera de acá.' })
    }
  }
}

module.exports = validator