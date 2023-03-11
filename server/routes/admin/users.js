let express = require("express");
const {
  create,
  update,
  destroy,
  index,
  show,
  search
} = require("../../controllers/admin/users");

let router = express.Router();

router.get("/", index);
router.get("/:id", show);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", destroy);
router.post("/search", search)

module.exports = router;
