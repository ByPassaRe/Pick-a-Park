const User = require("../models/user");


// Create and Save a new User
exports.create = (req, res) => {
    // Create a User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  });

  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      if(err.message) {
        res.status(400).send({message: err.message});
      } else {
        res.status(500).send({message: "Some error occurred while creating the User."});
      }
    });
};
