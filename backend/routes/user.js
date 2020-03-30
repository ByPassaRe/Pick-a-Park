      
const users = require("../controllers/user.js");
const router = require("express").Router();
router.post("/", users.create);

module.exports = router;