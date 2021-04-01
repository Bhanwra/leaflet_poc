require('dotenv').config()

const mongoose = require('mongoose')

const db_protocol = process.env.DB_PROTOCOL
const db_hostname = process.env.DB_HOST
const db_username = process.env.DB_USER
const db_password = process.env.DB_PASS
const db_collection = process.env.DB_COLL
const db_connection = `${db_protocol}${db_username}:${db_password}@${db_hostname}/${db_collection}?authSource=admin`

console.log(db_connection)

mongoose.connect(db_connection, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(response => {
        console.log(`Connected to collection: ${db_collection}.`)
    })
    .catch(error => {
        console.log(error)
    })

module.exports = mongoose