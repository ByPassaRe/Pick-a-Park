const issues = require("../controllers/issue.js");
const router = require("express").Router();

router.post("/", issues.create);

module.exports = router;