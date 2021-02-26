const City = require('../models/City')

const citiesController = {
  addCity: (req, res) => {
    const { cityName, cityImage, flagCountry } = req.body
    const cityToSave = new City({
      cityName,
      cityImage,
      flagCountry
    })
    cityToSave.save()
      .then(citySaved => res.json({ success: true, response: citySaved }))
      .catch(error => res.json({ success: false, error: error }))
  },

  allCities: (req, res) => { // controlador que devuelve al frontend todas las ciudades
    City.find()
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error: error }))
  },

  singleCity: (req, res) => {
    const id = req.params._id
    City.findById(id)
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error: error }))
  }
}

module.exports = citiesController