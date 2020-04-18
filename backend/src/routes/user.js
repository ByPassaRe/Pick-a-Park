      
const users = require("../controllers/user.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
//const role = require("../util/role");

router.post("/",
    users.create);
    
router.post("/change-password",
    authorize(),
    users.changePassword);

module.exports = router;