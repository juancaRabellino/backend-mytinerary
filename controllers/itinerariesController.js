const Itinerary = require('../models/Itinerary')

const itinerariesController = {
  addItinerary: (req, res) => {
    const { cityId, name, userName, userPic, likes, time, cost, hashtags, activities, comments } = req.body
    const itineraryToSave = new Itinerary({
      cityId, name, userName, userPic, likes, time, cost, hashtags, activities, comments
    })
    itineraryToSave.save()
      .then(async itinerarySaved => {
        const itineraryPopulated = await itinerarySaved.populate('cityId').execPopulate()
        res.json({ success: true, response: itineraryPopulated })
      })
      .catch(error => res.json({ success: false, error }))
  },

  allItineraries: (req, res) => {
    Itinerary.find().populate('cityId')
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error }))
  },

  getItinerariesByCityId: (req, res) => {
    const { cityid } = req.params
    Itinerary.find({ cityId: cityid }).populate('cityId')
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error }))
  },

  likeItinerary: (req, res) => {
    const id = req.params.itineraryid
    Itinerary.findOneAndUpdate({ _id: id }, { $addToSet: { likes: req.user._id } })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error }))
  },

  dislikeItinerary: (req, res) => {
    const id = req.params.itineraryid
    Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: req.user._id } })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error }))
  },

  addComment: (req, res) => {
    
    const id = req.params.itineraryid
    Itinerary.findOneAndUpdate({ _id: id }, { $push: { comments: { userName: req.body.userName, userImage: req.body.urlPic, content: req.body.actualComment } } }, { safe: true, upsert: true, new: true })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error }))
  },

  updateComment: async (req, res) => {
    const { itineraryid } = req.params
    const comentario = await Itinerary.findOneAndUpdate(
      { _id: itineraryid, "comments._id": req.body.commentToEdit.id },
      { $set: { "comments.$.content": req.body.commentToEdit.comment } },
      { new: true }
    )
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error }))
  },

  deleteComment: (req, res) => {
    const itineraryId = req.params.itineraryId
    const commentId = req.params.commentId
    Itinerary.findOneAndUpdate({ _id: itineraryId }, { $pull: { comments: { _id: commentId } } }, { safe: true, upsert: true, new: true })
      .then(data => res.json({ success: true, response: data }))
      .catch(error => res.json({ success: false, error }))
  }




}

module.exports = itinerariesController