const express = require('express')

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
    lan: Number
}))

app.get('/', (req, res) => {

    Marker.find({}, (err, docs) => {
        if ( err ) throw err

        docs.forEach(doc => {
            console.log(doc)
        })
    })

    res.send("Marker Info")
})

app.get('/test', (req, res) => {

    let testMarker = new Marker({
        title: "Test",
        lat: 0.0,
        lan: 0.1234567
    })

    testMarker.save((err) => {
        if ( err ) return err

        res.send("Success")
    })
})

app.listen(port, () => {
    console.log(`App hosted @ http://localhost:${port}`)
})