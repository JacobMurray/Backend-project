const mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    score: { type: Number, default: 0 },
    flagLatitude: {type: String, default: "0"},
    flagLongitude: {type:String, default: "0"},
    flagGenerated: {type: Boolean, default: false},
    flagCaptured: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);