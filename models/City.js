const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
  cityName: {type: String, required: true},
  cityImage: {type: String, required: true},
  flagCountry: {type: String, required: true}
})

const City = mongoose.model('city', citySchema)

module.exports = City