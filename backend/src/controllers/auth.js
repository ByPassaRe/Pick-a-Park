const User = require("../models/user");


exports.login = async (req, res) => {
    await User.findOneByCredentials(req.body.username,req.body.password);
/*
    if(!user)
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});

    console.log(user);

    console.log(User);
  */
    //User.findOneByCredentials(req.body.username,req.body.password);
    /*

    userQuery.exec((err,user)=>{
        if(err)
            res.status(500).send({success: false, msg: "Cannot connect to the database!"});
        

       

        //const matchQuery = await user.comparePassword(req.body.password).exec();
        user.comparePassword(req.body.password);
        
        user.comparePassword();
                if (isMatch) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), config.secret, {
                        expiresIn: 604800 // 1 week
                    });
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            }            
        
    })
    */

   
};