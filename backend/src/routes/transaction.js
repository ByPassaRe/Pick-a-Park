const transactions = require("../controllers/transaction.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");

router.get("/",
    authorize([role.PARKING_COMPANY]),
    transactions.read);

module.exports = router;