let express = require("express");
const { getExams } = require("../../controllers/exam/exam");

let router = express.Router();

router.get("/", getExams);

module.exports = router;
