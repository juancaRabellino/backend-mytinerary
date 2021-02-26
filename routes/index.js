const express = require ('express')
const router = express.Router()
const citiesController = require('../controllers/citiesController')
const itinerariesController = require('../controllers/itinerariesController')
const userController = require('../controllers/userController')
const validator = require('../controllers/validator')
const passport = require('passport')
require('../config/passport')

// CITIES
router.route('/cities') // si la ruta es cities
.get(citiesController.allCities) // y el metodo es get hacé (esto)
.post(citiesController.addCity) // y el metodo es post hacé (esto)

router.route('/city/:_id')
.get(citiesController.singleCity)

// ITINERARIOS
router.route('/itineraries')
.get(itinerariesController.allItineraries)
.post(itinerariesController.addItinerary)

router.route('/itineraries/:cityid')
.get(itinerariesController.getItinerariesByCityId)

router.route('/itinerary/like/:itineraryid')
.post(passport.authenticate('jwt', {session: false}), itinerariesController.likeItinerary)

router.route('/itinerary/unlike/:itineraryid')
.post(passport.authenticate('jwt', {session: false}), itinerariesController.dislikeItinerary)

router.route('/itinerary/addcomment/:itineraryid')
.post(passport.authenticate('jwt', {session: false}), itinerariesController.addComment)

router.route('/itinerary/:itineraryid')
.put(passport.authenticate('jwt', {session: false}), itinerariesController.updateComment)

router.route('/itinerary/:itineraryId/:commentId')
.delete(passport.authenticate('jwt', {session: false}), itinerariesController.deleteComment)


// USUARIOS
router.route('/user/signup')
.post(validator.validNewAccount, userController.signUp)

router.route('/user/signin')
.post(userController.signIn)

router.route('/user/ls')
.post(passport.authenticate('jwt', {session: false}), userController.logFromLS) // strategy: , options: , callback function

router.route('/user')
.get(userController.allUsers)

router.route('/user/:id')

module.exports = router