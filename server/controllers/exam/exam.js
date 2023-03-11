const { Exam, User} = require("../../db/sequelize");
const fs = require("fs");
const path = require("path");
const { resSendBody, resSendStatusMessage } = require("../../utils/api");

exports.uploadResult = (req, res) => {
  const { userId } = req;

  const file = req.file;

  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  // Store the file in the desired location
  const fileName = fs.renameSync(file.path, "uploads/" + file.originalname);

  Exam.create({
    userId,
    fileUrl: "uploads/" + file.originalname,
    code: "test",
    name: "test",
  })
    .then((_) => resSendStatusMessage(res, 201, "Exam uploaded successfully"))
    .catch((e) => res.send(e));
};


exports.getExams = (req, res) => {
  Exam.findAll({where: {
      hidden: 0
    }})
    .then(data => {
      resSendBody(res, 200, data);
    })
    .catch(err => res.send(err))
}

exports.getExamById = (req, res) => {
  const examId = req.params.id;
  Exam.findByPk(examId)
    .then(data => {
      if (data) {
        resSendBody(res, 200, data);
      } else {
        resSendStatusMessage(res, 404, `No exam with ${examId} found.`)
      }
    })
    .catch(err => res.send(err));
}

exports.addExam = (req, res) => {
  const exam = {
    title: req.body.title,
    description: req.body.description,
    hidden: req.body.hidden === 'true',
  }

  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  exam.fileUrl = "uploads/" + file.originalname;
  Exam.create(exam)
    .then(data => {
      resSendBody(res, 200, data);
    })
    .catch(err => res.send(err));
}

exports.updateExam = (req, res) => {
  const newExam = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    fileUrl: req.body.fileUrl
  };
  // file saving stuff

  Exam.findByPk(newExam.id).then((exam) => {
    if (!exam) {
      resSendStatusMessage(res, 404, "Exam doesn't exist");
      return;
    };

    exam.update({
      title: newExam.title,
      description: newExam.description,
      fileUrl: newExam.fileUrl
    })
      .then(() => {
        resSendStatusMessage(res, 200, "Exam updated successfully");
      })
      .catch(err => res.send(err));
  });
}

exports.deleteExam = (req, res) => {
  const examId = req.params.id;
  Exam.findByPk(examId).then((exam) => {
    if (!exam) {
      resSendStatusMessage(res, 404, "Exam doesn't exist");
      return;
    }
  })
  Exam.destroy({
    where: { id: examId }
  }).then(data => {
    resSendStatusMessage(res, 200, "Exam was deleted successfully");
    return;
  })
    .catch(err => res.send(err));
}

exports.downloadExam = (req, res) => {
  User.findByPk(req.userId).then((user) => {
    Exam.findByPk(user.examId).then((exam) => {
      const p = '../../' + exam.fileUrl;
      const file = fs.createReadStream(path.resolve(__dirname, p));
      res.setHeader(
          "Content-Disposition",
          'attachment: filename=' + exam.fileUrl
      );
      res.setHeader(
          "Access-Control-Expose-Headers",
          'Content-Disposition,X-Suggested-Filename'
      );
      file.pipe(res);
    })
  })

};

