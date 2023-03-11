const jwt = require("jsonwebtoken");
const { User, Role } = require("../db/sequelize");

const { resSendStatusMessage } = require("../utils/api");

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) return resSendStatusMessage(res, 403, "No token provided");

  token = token.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return resSendStatusMessage(res, 401, "Unauthorized");

    req.userId = decoded.id;
    next();
  });
};

const isAdmin = (req, res, next) => {
  const { userId } = req;

  User.findByPk(userId).then((user) => {
    if (!user) return resSendStatusMessage(res, 401, "Unauthorized");

    Role.findByPk(user.roleId).then((role) => {
      if (!role) return resSendStatusMessage(res, 404, "Role doesn't exist");

      if (role.name.toLowerCase() !== "admin")
        return resSendStatusMessage(res, 401, "Not Admin");

      next();
    });
  });
};

const isInstructor = (req, res, next) => {
  const { userId } = req;

  User.findByPk(userId).then((user) => {
    if (!user) return resSendStatusMessage(res, 401, "Unauthorized");

    Role.findByPk(user.roleId).then((role) => {
      if (!role) return resSendStatusMessage(res, 404, "Role doesn't exist");

      if (role.name.toLowerCase() !== "instructor")
        return resSendStatusMessage(res, 401, "Not Instructor");

      next();
    });
  });
};

const isAdminOrInstructor = (req, res, next) => {
  const { userId } = req;

  User.findByPk(userId).then((user) => {
    if (!user) return resSendStatusMessage(res, 401, "Unauthorized");

    Role.findByPk(user.roleId).then((role) => {
      if (!role) return resSendStatusMessage(res, 404, "Role doesn't exist");

      if (
        role.name.toLowerCase() !== "instructor" &&
        role.name.toLowerCase() !== "admin"
      )
        return resSendStatusMessage(res, 401, "Not Instructor or Admin");

      next();
    });
  });
};

module.exports = { verifyToken, isAdmin, isInstructor, isAdminOrInstructor };
