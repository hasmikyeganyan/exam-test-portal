let express = require("express");
const { index } = require("../controllers/roles");

let router = express.Router();

router.get("/", index);

module.exports = router;
