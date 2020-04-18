const parkingSpots = require("../controllers/parkingSpot.js");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");
const role = require("../util/role");


const authenticateJWT = (roles = []) => {
    //If the input role is between the allowed roles
    const isAllowed = role => roles.indexOf(role) > -1;    
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


router.post("/",authenticateJWT(role.DRIVER), parkingSpots.create);
router.get("/", parkingSpots.read);
router.patch("/:id", parkingSpots.patch);
router.get("/nearest", parkingSpots.getNearest);
router.get("/:id", parkingSpots.read);
module.exports = router;
