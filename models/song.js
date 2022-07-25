const mongoose = require("mongoose")
const {DateTime} = require('luxon');
const songSchema = mongoose.Schema({
    title:{type:String,required:true},
    artists:[{type:mongoose.Schema.Types.ObjectId, ref:"Artist", required:true}],
    duration:{type:Number,required:true},
    explicit:{type:Boolean, required:true},
    date:{type:Date,required:true}
})

songSchema.virtual('url').get(function () {
  return '/song/' + this._id;
});
songSchema.virtual('formatDate').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('Song', songSchema);