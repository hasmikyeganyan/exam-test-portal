const { User, Role } = require("../../db/sequelize");
const { resSendStatusMessage, resSendBody } = require("../../utils/api");
const bcrypt = require("bcryptjs");
const { Sequelize } = require("sequelize");

exports.index = (req, res) => {
  User.findAll({
    include: [Role],
  })
    .then((data) => resSendBody(res, 200, data))
    .catch((e) => res.send(e));
};

exports.show = (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((user) =>
      user
        ? resSendBody(res, 200, user)
        : resSendStatusMessage(res, 404, "User doesn't exist ")
    )
    .catch((e) => res.send(e));
};

exports.create = (req, res) => {
  const { name, lastname, email, password, role } = req.body;

  if (!name || !lastname || !email || !password || !role)
    return resSendStatusMessage(res, 400, "Missing required fields");

  Role.findByPk(+role).then((role) => {
    if (!role) return resSendStatusMessage(res, 400, "Role doesn't exist");
    User.create({
      name: name.trim(),
      lastname: lastname.trim(),
      email: email.trim().toLowerCase(),
      password: bcrypt.hashSync(password.trim(), 8),
      roleId: role.id,
    })
      .then((_) => resSendStatusMessage(res, 201, "User created"))
      .catch((e) =>
        resSendStatusMessage(res, 500, e.message ?? "User not created")
      );
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { name, lastname, email, password, role, course } = req.body;

  User.findByPk(id).then((user) => {
    if (!user) return resSendStatusMessage(res, 404, "User doesn't exist");
    user
      .update({
        name: name && name.trim(),
        lastname: lastname && lastname.trim(),
        email: email && email.trim().toLowerCase(),
        password: password && bcrypt.hashSync(password.trim(), 8),
        roleId: role && +role,
        courseId: course && +course,
      })
      .then((_) => resSendStatusMessage(res, 200, "User updated successfully"))
      .catch((e) =>
        resSendStatusMessage(res, 500, e.message ?? "User not updated")
      );
  });
};
exports.destroy = (req, res) => {
  const { id } = req.params;
  User.findByPk(id).then((user) => {
    if (!user) return resSendStatusMessage(res, 404, "User doesn't exist");
    user
      .destroy()
      .then((_) =>
        resSendStatusMessage(res, 204, "User destroyed successfully")
      )
      .catch((e) =>
        resSendStatusMessage(res, 500, e.message ?? "User not destroyed")
      );
  });
};


const Op = Sequelize.Op;
exports.search = (req, res) => {
  const searchString = req.body.searchString;
  User.findAll({
    where: {
      [Op.or]: [
        { email: { [Op.like]: `%${searchString}%` } },
        { name: { [Op.like]: `%${searchString}%` } },
        { lastname: { [Op.like]: `%${searchString}%` } }
      ]
    },
    include: [Role],

  }).then(data => res.send(data));
}