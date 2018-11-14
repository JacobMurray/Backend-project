const mongoose = require('mongoose');
const { Schema } = mongoose;

const FlagSchema = new Schema({
  //flag: {Latitude: Number, Longitude: Number},
  
  // latitude: {type: Number, default: 20},
  // longitude: {type:Number, default: 20},
  // flagCaptured: {type: Boolean, default: false}
  
});

module.exports = mongoose.model('Flag', UserSchema);