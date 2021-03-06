const User = require("../models/user");

const Transaction = require("../models/transaction");
const tokenUtils = require("../util/token");

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


exports.changePassword =  async (req, res) => {

  if(!req.body.actualPassword || !req.body.newPassword)
      return res.status(400).json({message: "Input values are missing"});

  const {actualPassword , newPassword} = req.body;
  let decodedToken;
  
  try {
    decodedToken = tokenUtils.tokenVerification(req.headers.authorization);
  } catch (error) {
    return res.status(400).json({message: "Token is invalid"});
  }

  const user = await User.findOne({username: decodedToken.username}).exec();
  if(user){
      if(await user.verifyPassword(actualPassword)){
         await user.updatePassword(newPassword)
          .then(() => {
            return res.status(200).json({message: "User updated"});
          })
          .catch(() => {
            return res.status(401).json({message: "Unexpected error during password updating"});
          })
      }
      else {
        return res.status(401).json({message: "Actual password is invalid"});
      }
  } else {
    return res.status(404).json({message: "User is invalid"});
  }
};


exports.getBalance = async (req, res) => {
  let decodedToken;
  
  try {
    decodedToken = tokenUtils.tokenVerification(req.headers.authorization);
  } catch (error) {
    return res.status(400).json({message: "Token is invalid"});
  }
  const user = await User.findOne({username: decodedToken.username}).exec();
  
  return res.status(200).json({balance: user.balance});
};

exports.chargeBalance = async (req, res) => {
  
  if(!req.body.amount)
    return res.status(400).json({message: "Input values are missing"});

  let decodedToken;
  
  try {
    decodedToken = tokenUtils.tokenVerification(req.headers.authorization);
  } catch (error) {
    return res.status(400).json({message: "Token is invalid"});
  }

  
  const user = await User.findOneAndUpdate(
    {username: decodedToken.username},
    {
      $inc: {
        balance: req.body.amount
      }
    },
    {new: true}
  ).exec();

  const transaction = new Transaction({
    userId: user._id,
    amount: req.body.amount
  });

  transaction
    .save()
    .then(res => {
      console.log("Transaction executed: "+res.amount)
    })
    .catch((error)=>{
      console.log("Transaction failed: "+error)
    });

  return res.status(200).json({balance: user.balance});
};