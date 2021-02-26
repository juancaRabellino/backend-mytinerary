const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  urlPic: String,
  username: String,
  password: String,
  country: String,
  rol: { type: String, default: 'nonadmin' }
})

const User = mongoose.model('user', userSchema)

module.exports = User