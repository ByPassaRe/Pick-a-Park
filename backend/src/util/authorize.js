const jwt = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

module.exports =  (roles = []) => {
    //If the use role is between the allowed roles
    //if input roles is [] the route is PUBLIC (without restriction)
    const isAllowed = (role) => {
        return roles.length === 0 || roles.indexOf(role) > -1;
    }
    // return a middleware
    return (req, res, next) => {
        if(!req.headers.authorization)
            return res.status(401).json({ message: 'Unauthorized (auth missing)' });
        
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, jsonSecret.secret, (err, user) => {
            if (err)
                return res.status(401).json({ message: 'Unauthorized (jwt error)' });
            if(!isAllowed(user.role))
                return res.status(401).json({ message: 'Unauthorized (your role is not allowed)' });
            
            req.user = user;
            next();
        });
    }
};
