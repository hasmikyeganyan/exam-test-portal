const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../db/sequelize");
const { resSendStatusMessage } = require("../utils/api");

exports.signup = (req, res) => {
  const { name, lastname, email, password, examId } = req.body;
    if (!name || !lastname || !email || !password || !examId) {
        return resSendStatusMessage(res, 400, "Missing required fields");
    }


  User.create({
    name: name.trim(),
    lastname: lastname.trim(),
    email: email.trim().toLowerCase(),
    password: bcrypt.hashSync(password.trim(), 8),
    roleId: 3,
    examId: examId,
  })
    .then((user) => {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      delete user.password;

      res.send({
        token: token,
        user: user,
      });
    })
    .catch((e) => {
      console.log(e);
      resSendStatusMessage(res, 400, e);
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return resSendStatusMessage(res, 400, "Missing required fields");

  User.scope("withPassword")
    .findOne({
      where: {
        email,
      },
    })
    .then((user) => {
      if (!user) return resSendStatusMessage(res, 404, "User not found");

      if (!bcrypt.compareSync(password, user.password))
        return resSendStatusMessage(res, 401, "Unauthorized");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400, // 24 hours
      });

      res.send({
        token: token,
      });
    })
    .catch((e) => resSendStatusMessage(res, 401, "Authentication failed"));
};

exports.self = (req, res) => {
  const userId = req.userId;

  User.findByPk(userId, {
    include: Role,
  })
    .then((user) => {
      if (!user) return resSendStatusMessage(res, 404, "User not found");

      res.send({
        user,
      });
    })
    .catch((_) => resSendStatusMessage(res, 500, "Something went wrong"));
};
