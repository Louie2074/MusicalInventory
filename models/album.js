const mongoose = require("mongoose")

const albumSchema = mongoose.Schema({
  title: { type: String, required: true, minLength: 5, maxLength: 100 },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
  },
  date: { type: Date, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],

});



albumSchema.virtual("url").get(function(){
     return '/album/' + this._id;
})

module.exports = mongoose.model("Album",albumSchema)