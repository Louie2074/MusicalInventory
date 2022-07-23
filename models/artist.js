const mongoose = require("mongoose")

const artistSchema = mongoose.Schema({
    first_name:{type:String, required:true},
    last_name:{type:String, required:true},
    date_of_birth:{type:Date},
    date_of_death:{type:Date}
})

artistSchema.virtual('url').get(function () {
  return '/artist/' + this._id;
});
artistSchema.virtual("name").get(function(){
    if(this.first_name && this.last_name) return this.first_name+" "+this.last_name
    return ""
})
artistSchema.virtual("lifespan").get(function(){
      let lifetime_string = '';
      if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getYear().toString();
      }
      lifetime_string += ' - ';
      if (this.date_of_death) {
        lifetime_string += this.date_of_death.getYear();
      }
      return lifetime_string;
})

module.exports = mongoose.model('Artist', artistSchema);
