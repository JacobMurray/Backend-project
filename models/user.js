const mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    score: { type: Number, default: 0 },
    latitude: {type: Number, default: null},
    longitude: {type:Number, default: null},
    flagGenerated: {type: Boolean, default: false},
    flagCaptured: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);