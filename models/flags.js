const mongoose = require('mongoose');
const { Schema } = mongoose;

const FlagSchema = new Schema({
  flag: {Latitude: Number, Longitude: Number},
  flagCaptured: Boolean
  
});

module.exports = mongoose.model('Flag', UserSchema);