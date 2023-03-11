const { Role } = require("../db/sequelize");
const { resSendBody } = require("../utils/api");

exports.index = (req, res) => {
  Role.findAll()
    .then((data) => resSendBody(res, 200, data))
    .catch((e) => res.send(e));
};
