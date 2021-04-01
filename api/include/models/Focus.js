const mongoose = require('./../database')

const Focus = mongoose.model('Focuses', new mongoose.Schema({
    title: String,
    lat: Number,
    lng: Number
}))

module.exports = Focus