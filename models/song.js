const mongoose = require("mongoose")

const songSchema = mongoose.Schema({
    title:{type:String,required:true},
    artist:[{type:mongoose.Schema.Types.ObjectId, ref:"Artist"}],
    duration:{type:Number,required:true},
    explicit:{type:Boolean, required:true},
    date:{type:Date,required:true}
})

songSchema.virtual('url').get(function () {
  return '/song/' + this._id;
});

module.exports = mongoose.model('Song', songSchema);