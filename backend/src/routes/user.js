      
const users = require("../controllers/user.js");
const router = require("express").Router();
router.post("/", users.create);
router.post("/change-password", users.changePassword);

module.exports = router;