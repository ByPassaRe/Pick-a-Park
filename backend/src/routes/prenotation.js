const prenotations = require("../controllers/prenotation.js");
const router = require("express").Router();


router.post("/",
    prenotations.create);

module.exports = router;
