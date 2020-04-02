const User = require("../models/user");
const configJSON = require('../config/jsonSecret');
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    
    try {
        const user = await User.findOneByCredentials(req.body.username,req.body.password);
        if(user){
            // if user is found and password is right create a token
            const token = jwt.sign(
                user.toJSON(),
                configJSON.secret, 
                { expiresIn: configJSON.expiresIn}
            );
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
            res.status(401).send({message: "Authentication failed"});
        }
    } catch (error) {
        res.status(401).send({message: "Authentication failed"});
    }
};