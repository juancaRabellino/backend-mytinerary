const mongoose = require('mongoose')

const itinerarySchema = new mongoose.Schema({
  
  cityId: {type: mongoose.Schema.Types.ObjectId, ref: ('city')},
  name: {type: String, required: true},
  userName: {type: String, required: true},
  userPic: {type: String, required: true},
  // likes: {type: Number, default: 0, required: false},
  likes: {type: Array, default: []},
  time: {type: Number, required: true},
  cost: {type: Number, required: true},
  hashtags: {type: Array, required: true},
  activities: [{title: String, image: String}],
  comments: [{userName: String, userImage: String, content: String}]
})

const Itinerary = mongoose.model('itinerary', itinerarySchema)

module.exports = Itinerary