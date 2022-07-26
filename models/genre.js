const mongoose = require("mongoose")

const genreScheme = mongoose.Schema({
    name:{type: String, required:true}
})

genreScheme.virtual('url').get(function () {
  return '/genre/' + this._id;
});

module.exports = mongoose.model('Genre', genreScheme);