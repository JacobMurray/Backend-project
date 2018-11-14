const mongoose = require("mongoose");

const LeaderBoardSchema = new mongoose.Schema({
    leaders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

module.exports = mongoose.model("LeaderBoard", LeaderBoardSchema);