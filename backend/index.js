const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./models");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Connection to Database
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });





app.get('/', function(req, res) {
    console.log("Hello World!");
});


const User = db.users;

app.post('/signup', function(req, res) {
    
  // Create a User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

});




//Server listening
app.listen(PORT, function() {
    console.log('Server is running on port:', PORT);
});