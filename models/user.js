const mongoose                = require("mongoose"),
    passportLocalMongoose   = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    image: { type: String, default: 'https://toppng.com/public/uploads/preview/person-with-flag-silhouette-11523435122poizwmno8w.png' },
    score: { type: Number, default: 0 },
    flagLatitude: {type: Number, default: "0"},
    flagLongitude: {type: Number, default: "0"},
    flagGenerated: {type: Boolean, default: false},
    flagCaptured: {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);