const { User } = require("../../db/sequelize");
const { resSendStatusMessage } = require("../../utils/api");
const bcrypt = require("bcryptjs");

exports.update = (req, res) => {
  const { userId } = req;
  const { password, oldPassword } = req.body;

  if (!password || !oldPassword)
    return resSendStatusMessage(res, 400, "Password are required");

  User.scope("withPassword")
    .findByPk(userId)
    .then((user) => {
      if (!user) return resSendStatusMessage(res, 404, "User doesn't exist");

      bcrypt.compare(oldPassword, user.password).then((isMatch) => {
        if (!isMatch)
          return resSendStatusMessage(res, 400, "Old Password is incorrect");

        user
          .update({
            password: password && bcrypt.hashSync(password.trim(), 8),
          })
          .then((_) =>
            resSendStatusMessage(res, 200, "Account updated successfully")
          )
          .catch((e) => res.send(e));
      });
    });
};
