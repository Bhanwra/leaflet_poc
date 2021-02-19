const express = require('express')

const app = express()
const port = 3000
const mongoose = require('mongoose')
mongoose.connect('mongodb://Bhanwra:vultr123@155.138.159.105/map-api?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true})
const Marker = mongoose.model('Marker', new mongoose.Schema({
    title: String,
    lat: mongoose.Types.Decimal128,
    lan: mongoose.Types.Decimal128
}))

app.get('/', (req, res) => {
    Marker.find((err, docs) => {
        if ( err ) {
            console.error(err) 
            return res.send("ERROR")
        }

        return res.send(docs)
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