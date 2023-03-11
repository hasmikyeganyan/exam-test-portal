const { Role, User, Exam } = require("./sequelize");
const bcrypt = require("bcryptjs");

const migrateRoles = () => {
  return Role.count().then((count) => {
    if (count > 0) return;

    return Role.bulkCreate([
      { name: "Admin" },
      { name: "Instructor" },
      { name: "Student" },
    ]).then(() => console.log("Roles Migrated!"));
  });
};

const migrateExams = () => {
  return Exam.count().then((count) => {
    if (count > 0) return;

    return Exam.bulkCreate([
      { title: "Front", description: "", fileUrl: "", hidden: "0" },
      { title: "Backend", description: "", fileUrl: "", hidden: "0" },
    ]).then(() => console.log("Exams Migrated!"));
  });
};

const migrateAdmin = () => {
  return User.count().then((count) => {
    if (count > 0) return;

    return Role.findOne({ where: { name: "Admin" } }).then((role) => {
      if (!role) return;

      return User.create({
        name: "Admin",
        lastname: "Adminyan",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("admin", 8),
        roleId: role.id,
      });
    });

    return;
  });
};

module.exports = { migrateRoles, migrateAdmin, migrateExams };
