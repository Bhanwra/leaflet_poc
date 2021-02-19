const express = require('express')
const cors = require("cors")

const app = express()
const port = 3100
const mongoose = require('mongoose')
mongoose.connect('mongodb://Bhanwra:vultr123@155.138.159.105/map-api?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(success => {
        console.log(`Connection to db successful`)
    })
    .catch(err => {
        console.log(err)
    }) 
const Marker = mongoose.model('Marker', new mongoose.Schema({
    title: String,
    lat: Number,
    lng: Number
}))

app.use(cors())

app.get('/', (req, res) => {

    Marker.find({}, (err, docs) => {
        if ( err ) throw err

        docs.forEach(doc => {
            console.log(doc)
        })
        res.json(docs)
    })
})

app.get('/test', (req, res) => {

    let testMarker = new Marker({
        title: "Test",
        lat: 77.42782352730109,
        lng: 85.75927734375
    })

    testMarker.save((err) => {
        if ( err ) return err

        res.send("Success")
    })
})

app.listen(port, () => {
    console.log(`App hosted @ http://localhost:${port}`)
})