const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('Hello world');
});

app.listen(PORT, function() {
    console.log('Server is running on port:', PORT);
});