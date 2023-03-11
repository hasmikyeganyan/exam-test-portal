let express = require("express");
const { update } = require("../../controllers/account/self");

let router = express.Router();

router.put("/", update);

module.exports = router;
