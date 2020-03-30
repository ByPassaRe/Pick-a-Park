const express = require('express');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const app = express();

const db = require('./dbHandler');

dbUrl = process.env.DBURI || "mongodb://localhost:27017/test";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('Hello world');
});

db.connect(dbUrl).then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


require("./routes/user.route")(app);



//Server listening
app.listen(PORT, function() {
    console.log('Server is running on port:', PORT);
});