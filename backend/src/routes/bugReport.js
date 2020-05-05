const bugReports = require('./../controllers/bugReport');
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");

router.post('/',authorize([role.DRIVER, role.MUNICIPALITY_EMPLOYEE, role.MUNICIPALITY_POLICE]), bugReports.create);
router.get('/', authorize([role.PARKING_COMPANY]), bugReports.get);

module.exports = router;