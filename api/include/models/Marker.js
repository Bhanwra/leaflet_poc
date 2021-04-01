const mongoose = require('./../database')

const Marker = mongoose.model('Marker', new mongoose.Schema({
    title: String,
    lat: Number,
    lng: Number
}))

module.exports = Marker