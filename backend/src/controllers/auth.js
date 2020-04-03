const User = require("../models/user");
const configJSON = require('../config/jsonSecret');
const jwt = require("jsonwebtoken");

exports.login = async function(req, res) {
    
    const {username , password} = req.body;

    await User.findOne({username: username})
        .then( async (user) => {
            if(!user)
                //Username does not exists
                res.status(400).send({message: "Wrong Username/Password"});
            else {
                //Verify the password
                await user.verifyPassword(password).then( match => {
                    //Password correct
                    if(match){
                         // if user is found and password is right create a token
                         const token = jwt.sign(
                            { username: user.username, role: user.role },
                            configJSON.secret, 
                            { expiresIn: configJSON.expiresIn }
                        );
                        // return the information including token as JSON
                        res.json({
                            success: true,
                            token: token,
                            message: "Authentication successful"
                        });
                    }
                    else {
                        //Wrong password
                        res.status(400).send({message: "Wrong Username/Password"});
                    }
                    
                })
            }
        })
        .catch(() => {
            res.status(500).send({message: "Unexpected error"});
        })
};