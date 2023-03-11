const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PWD,
    {
      dialect: "mysql",
    }
);

const Role = sequelize.define("role", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

const User = sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          isLowercase: true,
        },
      },
      examId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
);

const Exam = sequelize.define("exam", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  fileUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  hidden: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

const ExamResult = sequelize.define("exam_result", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  fileUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

User.belongsTo(Role, { foreignKey: "roleId" });

User.belongsToMany(Exam, { through: ExamResult });
Exam.belongsToMany(User, { through: ExamResult });

ExamResult.belongsTo(Exam);
ExamResult.belongsTo(User);

module.exports = { sequelize, Role, User, Exam, ExamResult };
