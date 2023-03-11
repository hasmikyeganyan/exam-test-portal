const { ExamResult, Exam, User } = require("../../db/sequelize");
const { resSendStatusMessage, resSendBody } = require("../../utils/api");
const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");


exports.uploadExamResults = (req, res, next) => {
  const { userId, examId } = req;
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }

  User.findByPk(userId).then((user) => {
    const fileName = fs.renameSync(file.path, "uploads/" + file.originalname);

    ExamResult.create({
      score: req.body.score,
      fileUrl: "uploads/" + file.originalname,
      userId: userId,
      examId: user.examId,
    })
      .then((_) =>
        resSendStatusMessage(res, 201, "Exam Results uploaded successfully")
      )
      .catch((e) => res.send(e));
  });
};

exports.downloadExamResults = (req, res) => {
  const p = '../../' + req.body.fileUrl;
  const file = fs.createReadStream(path.resolve(__dirname, p));
  res.setHeader(
    "Content-Disposition",
    'attachment: filename=' + req.body.fileUrl
  );
  res.setHeader(
    "Access-Control-Expose-Headers",
    'Content-Disposition,X-Suggested-Filename'
  );
  file.pipe(res);
};

exports.getExamResults = (req, res) => {
  ExamResult.findAll({ include: [Exam, User] })
    .then((data) => {
      resSendBody(res, 200, data);
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getExamResultById = (req, res) => {
  const examId = req.params.id;
  ExamResult.findAll()
    .findByPk(examId)
    .then((data) => {
      if (data) {
        resSendBody(res, 200, data);
      } else {
        resSendStatusMessage(res, 404, `No exam with ${examId} found.`);
      }
    })
    .catch((err) => res.send(err));
};

exports.addExamResult = (req, res) => {
  const ExamResult = {
    score: req.body.score,
    fileUrl: req.body.fileUrl,
  };

  ExamResult.create(examResult)
    .then((data) => {
      resSendBody(res, 200, data);
    })
    .catch((err) => res.send(err));
};

exports.updateExamResult = (req, res) => {
  const newExam = {
    id: req.body.id,
    score: req.body.score,
  };

  ExamResult.findByPk(newExam.id).then((exam) => {
    if (!exam) {
      resSendStatusMessage(res, 404, "Exam doesn't exist");
      return;
    }

    exam
      .update({
        score: newExam.score,
        fileUrl: newExam.fileUrl,
      })
      .then(() => {
        resSendStatusMessage(res, 200, "Exam updated successfully");
      })
      .catch((err) => res.send(err));
  });
};

exports.deleteExamResult = (req, res) => {
  const { id } = req.params;
  ExamResult.findByPk(id).then((result) => {
    if (!result) return resSendStatusMessage(res, 404, "Exam doesn't exist");
    result
      .destroy()
      .then((_) =>
        resSendStatusMessage(res, 204, "Exam destroyed successfully")
      )
      .catch((e) =>
        resSendStatusMessage(res, 500, e.message ?? "Exam not destroyed")
      );
  });
};

const Op = Sequelize.Op;
exports.searchExamResults = (req, res) => {
  const searchString = req.body.searchString;
  ExamResult.findAll({
    include: [{
      model: User,
      where: {
        [Op.or]: [
          { email: { [Op.like]: `%${searchString}%` } },
          { name: { [Op.like]: `%${searchString}%` } },
          { lastname: { [Op.like]: `%${searchString}%` } }
        ]
      }
    }
    ]
  }).then(data => res.send(data));
}

