const issues = require("../controllers/issue.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");

router.post("/", 
    authorize([role.MUNICIPALITY_POLICE]),
    issues.create);
router.get("/", 
    authorize([role.MUNICIPALITY_POLICE]),
    issues.read);
router.get("/:id",
    authorize([role.MUNICIPALITY_POLICE]),
    issues.read);
router.post("/:id",
    authorize([role.MUNICIPALITY_POLICE]),
    issues.update);
module.exports = router;