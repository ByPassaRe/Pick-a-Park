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


exports.changePassword =  (req, res) => {
  console.log(req.body);
  /*
  if(!req.body.username || !req.body.password)
      return res.status(400).json({message: "Input values are missing"});

  const {username , oldPassword, newPassword} = req.body;
  const user = await User.findOne({username: username}).exec();

  if(user){
      if(await user.verifyPassword(oldPassword)){
          //newPassword deve essere hashata.
          User.findByIdAndUpdate({_id: user._id},{password: newPassword})
              .exec()
              .then((updateUser)=>{
                  console.log(updateUser);
              }).catch((err)=>{
                  console.log(err);
              });
          
      }
  }
  */
};
