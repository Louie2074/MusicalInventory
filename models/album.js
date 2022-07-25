const mongoose = require("mongoose")
const {DateTime} = require("luxon")

const albumSchema = mongoose.Schema({
  title: { type: String, required: true},
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
albumSchema.virtual('formatDate').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Album",albumSchema)