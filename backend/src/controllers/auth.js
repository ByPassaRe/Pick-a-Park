const User = require("../models/user");
const tokenUtil = require("../util/token");


exports.login = async function(req, res) {
    if(!req.body.username || !req.body.password)
        return res.status(400).json({message: "Input values are missing"});

    const {username , password} = req.body;

    const user = await User.findOne({username: username}).exec();
    //If user does not exists
    if(!user) return res.status(400).json({message: "Wrong Username/Password"});
    
    try {
        if(await user.verifyPassword(password))
            return res.json({ success: true, token: tokenUtil.tokenGenerator(user), message: "Authentication successful" });
        else
            return res.status(400).json({message: "Wrong Username/Password"});
    } catch (error) {
        return res.status(500).json({message: "Unexpected error"});
    }
};
