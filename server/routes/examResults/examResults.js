let express = require("express");
const { 
  uploadExamResults,
  downloadExamResults,
  getExamResults,
  getExamResultById,
  addExamResult,
  updateExamResult,
  deleteExamResult,
  searchExamResults,
} = require("../../controllers/examResults/examResults");

let router = express.Router();

router.get("/", getExamResults);
router.get("/:id", getExamResultById);
router.post("/", addExamResult);
router.put("/evaluate", updateExamResult);
router.delete("/:id", deleteExamResult)
router.post("/uploadExamResults", uploadExamResults);
router.post("/download", downloadExamResults);
router.post("/search", searchExamResults);

module.exports = router;