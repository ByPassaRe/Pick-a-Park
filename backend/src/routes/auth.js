const auth = require("../controllers/auth.js");
const router = require("express").Router();

router.post("/", auth.login);

module.exports = router;

