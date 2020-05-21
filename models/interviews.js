const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewsSchema = new Schema({
    recruiterEmail: { type: String, required: true },
    applicantEmail: { type: String, required: true },
    interviewTime: { type: Date, required: true },
    interviewLocation: { type: String, required: true },
});

const Interviews = mongoose.model("Interviews", interviewsSchema);

module.exports = Interviews;