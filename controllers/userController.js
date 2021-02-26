const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {
  signUp: async (req, res) => {
    let errors = {details:[]}
    const { firstName, lastName, urlPic, username, password, country, rol } = req.body
    const userExists = await User.findOne({ username: username })

    userExists && errors.details.push({message: 'El nombre de usuario ya existe.'})

    if (errors.details.length === 0) {
      const passwordHasheado = bcryptjs.hashSync(password, 10)
      var newUser = new User({ firstName, lastName, urlPic, username, password: passwordHasheado, country, rol })
      var newUserSaved = await newUser.save()
      var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {})
    }
  
    return res.json({
      success: errors.details.length === 0 ? true : false,
      errors,
      response: errors.details.length === 0 && { token, name: newUserSaved.firstName, urlPic: newUserSaved.urlPic, id: newUserSaved._id }
    })
    
  },

  signIn: async (req, res) => {
    const { username, password } = req.body
    const userExists = await User.findOne({ username: username })
    if (!userExists) {
      return res.json({ success: false, mensaje: 'Nombre de usuario y/o contraseña incorrectos.' })
    }
    const passwordMatches = bcryptjs.compareSync(password, userExists.password)
    if (!passwordMatches) {
      return res.json({ success: false, mensaje: 'Nombre de usuario y/o contraseña incorrectos.' })
    }
    var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
    return res.json({ success: true, response: { token, name: userExists.firstName, urlPic: userExists.urlPic, id: userExists._id } })
  },

  allUsers: (req, res) => {
    User.find()
      .then(users => res.json({ success: true, response: users }))
      .catch(error => res.json({ success: false, error }))
  },

  logFromLS: (req, res) => {
    res.json({ success: true, response: { token: req.body.token, name: req.user.firstName, urlPic: req.user.urlPic, id: req.user._id} })
  }
}

module.exports = userController