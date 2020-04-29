const bugReports = require('./../controllers/bugReport');
const router = require("express").Router();

router.post('/', bugReports.create);
router.get('/', bugReports.get);

module.exports = router;