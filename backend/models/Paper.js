const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: { type: String },
    publicationYear: { type: Number },
    citations: { type: Number },
});

const Paper = mongoose.model('Paper', paperSchema);
module.exports = Paper;
