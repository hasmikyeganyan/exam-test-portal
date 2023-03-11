let express = require("express");
const { signup, signin, self } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/auth");

let router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/auth/self", verifyToken, self);

module.exports = router;
