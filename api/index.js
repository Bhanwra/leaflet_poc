require("dotenv").config()

const express = require('express')
const cors = require("cors")

const app = express()
const port = process.env.APP_PORT

const focusRouter = require('./routes/focus')

const mongoose = require('./include/database')
const Marker = require('./include/models/Marker')

app.use(cors())

app.get('/', (req, res) => {
    console.log("Loading Website");

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

app.use('/focus', focusRouter)