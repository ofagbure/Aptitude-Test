const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    profileImg: { type: String, required: true },
    profileBackground: { type: Number, default: 1 },
    website: String,
    description: String,
    city: { type: String, required: true },
    willMove: { type: Boolean, required: true },
    testResults: String,
    date: { type: Date, default: Date.now }
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;