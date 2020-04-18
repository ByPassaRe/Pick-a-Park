const jwt = require("jsonwebtoken");
const configJSON = require("../config/jsonSecret");

exports.tokenGenerator = (user) => {
    const payload = { username: user.username, role: user.role };
    const options = { expiresIn: configJSON.expiresIn };
    return jwt.sign(payload,configJSON.secret,options);
}

exports.tokenVerification = (token) => {
    return jwt.verify(token,configJSON.secret);
};