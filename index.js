import mongoose from 'mongoose';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

mongoose.connect('mongodb://Bhanwra:vultr123@155.138.159.105/?authSource=admin', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

    const markerSchema = new mongoose.Schema({
        title: String,
        lat: Decimal128,
        lan: Decimal128
    })

    const Marker = mongoose.model('Marker', markerSchema)

    const testMarket = new Marker({
        title: "Test Marker",
        lat: 0.0,
        lan: 0.0
    })

});