const bugReports = require('./../controllers/bugReport');
const router = require("express").Router();

router.post('/', bugReports.create);

module.exports = router;