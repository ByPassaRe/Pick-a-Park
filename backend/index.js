const express = require('express');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const app = express();

const db = require('./dbHandler');

dbUrl = process.env.DBURI || "mongodb://localhost:27017/test";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes')(app);

db.connect(dbUrl).then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, function() {
      console.log('Server is running on port:', PORT);
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});