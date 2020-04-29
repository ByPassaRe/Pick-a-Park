      
const users = require("../controllers/user.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");

router.post("/",
    users.create);
    
router.post("/change-password",
    authorize(),
    users.changePassword);

router.get("/balance",
    authorize([role.DRIVER]),
    users.getBalance);

router.patch("/chargeBalance",
    authorize([role.DRIVER]),
    users.chargeBalance);

module.exports = router;