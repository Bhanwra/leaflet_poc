const express = require('express')
const Focus = require('../include/models/Focus')
const router = express.Router()

router.get('/', (req, res) => {
    // show indice here
    Focus.findOne({}, (error, docs) => {
        if ( error ) throw error

        res.json(docs)
    })
})

router.get('/:id', (req, res) => {
    res.send(req.params)
})

module.exports = router