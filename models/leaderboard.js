const mongoose          = require("mongoose"),
passportLocalMongoose   = require("passport-local-mongoose");

const LeaderBoardSchema = new mongoose.Schema({
    leaderBoard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

LeaderBoardSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("LeaderBoard", LeaderBoardSchema);