const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, uniquie: true },
    password: { type: String, required: true },
    recruiter: { type: Boolean, required: true }
});

const User = mongoose.model("User", userSchema);

module.exports = User;