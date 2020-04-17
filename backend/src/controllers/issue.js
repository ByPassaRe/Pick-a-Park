const Issue = require("../models/issue");


// Create and Save a new Issue
exports.create = (req, res) => {
    // Create a Issue
  const issue = new Issue({
    text: req.body.text
  });

  issue
    .save(issue)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      if(err.message) {
        res.status(400).send({message: err.message});
      } else {
        res.status(500).send({message: "Some error occurred while creating the Issue."});
      }
    });
};