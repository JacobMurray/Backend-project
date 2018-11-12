const mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: { type: String, required: true },
    password: {type: String, required: true},
    score: { type: Number, default: 0 }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);