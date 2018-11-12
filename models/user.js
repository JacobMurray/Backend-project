const mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    score: { type: Number, default: 0 }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);