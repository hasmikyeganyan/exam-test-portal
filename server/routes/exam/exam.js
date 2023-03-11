let express = require("express");
const { getExams, addExam, updateExam, deleteExam, getExamById,uploadResult, downloadExam } = require("../../controllers/exam/exam");

let router = express.Router();

router.get("/", getExams);
router.get("/download", downloadExam);

router.get("/:id", getExamById);
router.post("/", addExam);
router.put("/", updateExam);
router.delete("/:id", deleteExam)
router.post("/uploadResult", uploadResult);

module.exports = router;
